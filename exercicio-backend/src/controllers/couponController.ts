import type { NextFunction, Request, Response } from 'express'
import { couponRepository } from '../repositories/couponRepository'

export const couponController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await couponRepository.findAll()
      res.json(coupons)
    } catch (err) {
      next(err)
    }
  }
}
