import { db } from '../data/db'
import type { Order } from '../types'

export const orderRepository = {
  async findById(id: string): Promise<Order | undefined> {
    return db.orders.get(id)
  },

  async findAll(): Promise<Order[]> {
    return Array.from(db.orders.values())
  },

  async save(order: Order): Promise<Order> {
    db.orders.set(order.id, order)
    return order
  }
}
