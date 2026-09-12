import type { Coupon, Order, Product } from '../types'

/**
 * "Banco de dados" em memória.
 *
 * Reiniciado a cada boot do processo. Nos testes, use resetDb() para voltar ao
 * estado inicial conhecido.
 */

interface Database {
  products: Map<string, Product>
  coupons: Map<string, Coupon>
  orders: Map<string, Order>
  /** Mapeia uma chave de idempotência para o id do pedido já criado. */
  idempotencyKeys: Map<string, string>
}

function seedProducts(): Map<string, Product> {
  const products: Product[] = [
    { id: 'p_teclado', name: 'Teclado mecânico', priceCents: 35000, stock: 10 },
    { id: 'p_mouse', name: 'Mouse sem fio', priceCents: 15000, stock: 5 },
    { id: 'p_monitor', name: 'Monitor 27"', priceCents: 120000, stock: 3 },
    { id: 'p_headset', name: 'Headset gamer', priceCents: 45000, stock: 1 },
    { id: 'p_webcam', name: 'Webcam Full HD', priceCents: 28000, stock: 0 }
  ]
  return new Map(products.map((p) => [p.id, p]))
}

function seedCoupons(): Map<string, Coupon> {
  const coupons: Coupon[] = [
    { code: 'DEZOFF', discountType: 'percent', value: 10, active: true },
    { code: 'CEM', discountType: 'fixed', value: 10000, active: true },
    { code: 'META90', discountType: 'percent', value: 90, active: true },
    { code: 'EXPIRADO', discountType: 'percent', value: 20, active: false }
  ]
  return new Map(coupons.map((c) => [c.code, c]))
}

export const db: Database = {
  products: seedProducts(),
  coupons: seedCoupons(),
  orders: new Map(),
  idempotencyKeys: new Map()
}

export function resetDb(): void {
  db.products = seedProducts()
  db.coupons = seedCoupons()
  db.orders = new Map()
  db.idempotencyKeys = new Map()
}
