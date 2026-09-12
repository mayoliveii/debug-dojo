export interface Product {
  id: string
  name: string
  /** Preço unitário em centavos. */
  priceCents: number
  stock: number
}

export type DiscountType = 'percent' | 'fixed'

export interface Coupon {
  code: string
  discountType: DiscountType
  /** Para 'percent': 0-100. Para 'fixed': centavos. */
  value: number
  active: boolean
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED'

export interface OrderItem {
  productId: string
  quantity: number
  /** Preço unitário no momento da compra, em centavos. */
  unitPriceCents: number
}

export interface Order {
  id: string
  items: OrderItem[]
  couponCode?: string
  subtotalCents: number
  discountCents: number
  totalCents: number
  status: OrderStatus
  createdAt: number
  paymentId?: string
}

export interface CreateOrderItemInput {
  productId: string
  quantity: number
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[]
  couponCode?: string
}
