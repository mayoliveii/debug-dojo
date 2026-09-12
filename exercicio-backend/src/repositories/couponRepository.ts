import { db } from '../data/db'
import type { Coupon } from '../types'

export const couponRepository = {
  async findById(id: string): Promise<Coupon | undefined> {
    return db.coupons.get(id)
  },

  async findAll(): Promise<Coupon[]> {
    return Array.from(db.coupons.values())
  },

  async save(coupon: Coupon): Promise<Coupon> {
    db.coupons.set(coupon.code, coupon)
    return coupon
  }
}
