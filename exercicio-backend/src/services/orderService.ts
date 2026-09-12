import { db } from '../data/db'
import { productRepository } from '../repositories/productRepository'
import { orderRepository } from '../repositories/orderRepository'
import { couponService } from './couponService'
import { paymentGateway, PaymentError } from './paymentGateway'
import { AppError, ConflictError, ValidationError } from '../errors'
import type {
  CreateOrderInput,
  Order,
  OrderItem
} from '../types'

let orderSeq = 0

function nextOrderId(): string {
  orderSeq += 1
  return `ord_${orderSeq}`
}

export const orderService = {
  async createOrder(
    input: CreateOrderInput,
    idempotencyKey?: string
  ): Promise<Order> {
    if (!input || !Array.isArray(input.items) || input.items.length === 0) {
      throw new ValidationError('O pedido precisa conter ao menos um item.')
    }

    if (idempotencyKey) {
      const existingId = db.idempotencyKeys.get(idempotencyKey)
      if (existingId) {
        const existing = await orderRepository.findById(existingId)
        if (existing) return existing
      }
    }

    // Monta os itens do pedido e valida disponibilidade de estoque.
    const items: OrderItem[] = []
    let subtotalCents = 0

    for (const line of input.items) {
      const product = await productRepository.findById(line.productId)
      if (!product) {
        throw new AppError(404, 'Você deve adicionar pelo menos um item válido ao pedido.')
      }

      if (product.stock < line.quantity) {
        throw new ConflictError(
          `Estoque insuficiente para o produto ${product.name}.`
        )
      }

      items.push({
        productId: product.id,
        quantity: line.quantity,
        unitPriceCents: product.priceCents
      })
      subtotalCents += product.priceCents * line.quantity
    }

    const discountCents = couponService.computeDiscount(
      input.couponCode,
      subtotalCents
    )

    const totalCents = subtotalCents - discountCents

    // Cobrança no gateway externo.
    let paymentId: string
    try {
      const charge = await paymentGateway.charge(totalCents)
      paymentId = charge.paymentId
    } catch (err) {
      if (err instanceof PaymentError) {
        throw new ConflictError(`Pagamento recusado: ${err.message}`)
      }
      throw err
    }

    // Baixa de estoque após pagamento aprovado.
    for (const item of items) {
      const product = await productRepository.findById(item.productId)
      if (product) {
        product.stock -= item.quantity
        await productRepository.save(product)
      }
    }

    const order: Order = {
      id: nextOrderId(),
      items,
      couponCode: input.couponCode,
      subtotalCents,
      discountCents,
      totalCents,
      status: 'PAID',
      createdAt: Date.now(),
      paymentId
    }

    await orderRepository.save(order)

    if (idempotencyKey) {
      db.idempotencyKeys.set(idempotencyKey, order.id)
    }

    return order
  },

  async getOrder(id: string): Promise<Order | undefined> {
    return orderRepository.findById(id)
  },

  async listOrders(): Promise<Order[]> {
    return orderRepository.findAll()
  },

  async cancelOrder(id: string): Promise<Order> {
    const order = await orderRepository.findById(id)
    if (!order) {
      throw new AppError(404, `Pedido ${id} não pode ser cancelado porque não foi encontrado.`)
    }

    // Devolve o estoque reservado pelo pedido.
    for (const item of order.items) {
      const product = await productRepository.findById(item.productId)
      if (product) {
        product.stock += item.quantity
        await productRepository.save(product)
      }
    }

    order.status = 'CANCELLED'
    await orderRepository.save(order)

    return order
  }
}
