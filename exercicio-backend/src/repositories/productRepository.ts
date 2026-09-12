import { db } from '../data/db'
import type { Product } from '../types'

export const productRepository = {
  async findById(id: string): Promise<Product | undefined> {
    return db.products.get(id)
  },

  async findAll(): Promise<Product[]> {
    return Array.from(db.products.values())
  },

  async save(product: Product): Promise<Product> {
    db.products.set(product.id, product)
    return product
  }
}
