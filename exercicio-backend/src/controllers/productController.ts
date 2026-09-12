import type { NextFunction, Request, Response } from 'express'
import { productRepository } from '../repositories/productRepository'

export const productController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productRepository.findAll()
      res.json(products)
    } catch (err) {
      next(err)
    }
  }
}
