import type { NextFunction, Request, Response } from 'express';
import { orderService } from '../services/orderService';
import type { CreateOrderInput } from '../types';
import { couponService } from '../services/couponService';
import * as z from "zod";

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive()
    })
  ).nonempty("O pedido precisa conter ao menos um item."),
  couponCode: z.string().optional()
});

export const orderController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = req.header('Idempotency-Key') || undefined
      const data = req.body as CreateOrderInput

      const input = createOrderSchema.parse(data);
      if (input.couponCode) {
        const isValidCoupon = await couponService.validateCoupon(input.couponCode);
        if (!isValidCoupon) {
          return res.status(400).json({
            success: false,
            message: `O cupom ${input.couponCode} é inválido ou expirado.`
          });
        }

      }

      const order = await orderService.createOrder(input, idempotencyKey)

      res.status(201).json({
        success: true,
        data: order
      })
    } catch (err) {
      next(err)
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrder(req.params.id)
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado.'
        })
      }
      res.json(order)
    } catch (err) {
      next(err)
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.listOrders()
      res.json(orders)
    } catch (err) {
      next(err)
    }
  },

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.cancelOrder(req.params.id)

      res.json(order)
    } catch (err) {
      next(err)
    }
  },
}

