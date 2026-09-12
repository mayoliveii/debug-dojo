export type DiscountType = 'percent' | 'fixed'

export interface Coupon {
  id: string
  code: string
  description: string
  discountType: DiscountType
  /** Para 'percent' representa 0-100. Para 'fixed' representa centavos. */
  amount: number
  active: boolean
  createdAt: number
}

export interface NewCouponInput {
  code: string
  description: string
  discountType: DiscountType
  amount: number
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'
