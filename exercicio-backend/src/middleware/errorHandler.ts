import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code
    })
  }

  const message = err instanceof Error ? err.message : 'Erro interno.'
  return res.status(500).json({ error: message, code: 'INTERNAL' })
}
