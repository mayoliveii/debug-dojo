import { db } from '../data/db'
import type { Coupon } from '../types'

export const couponService = {
  find(code: string): Coupon | undefined {
    return db.coupons.get(code)
  },

  /**
   * Calcula o desconto (em centavos) de um cupom sobre um subtotal.
   * Retorna 0 se o cupom não existir ou estiver inativo.
   */
  computeDiscount(code: string | undefined, subtotalCents: number): number {
    if (!code) return 0

    const coupon = db.coupons.get(code)
    if (!coupon || !coupon.active) {
      return 0
    }

    if (coupon.discountType === 'percent') {
      return Math.round((subtotalCents * coupon.value) / 100)
    }

    return coupon.value
  },

  validateCoupon(code: string): boolean {
    const coupon = db.coupons.get(code)
    return !!coupon && coupon.active
  }
}
