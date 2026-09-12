import express from 'express'
import { router } from './routes'
import { errorHandler } from './middleware/errorHandler'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use('/api', router)
  app.use(errorHandler)

  return app
}
