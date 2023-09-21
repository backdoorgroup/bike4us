import helmet from "helmet"
import cors from "cors"
import express from "express"
import pino from "pino-http"

import { identity } from "@/auth/middlewares"
import { logger } from "@/logger"
import { dataSource } from "@/database"
import { settings } from "@/settings"
import { router } from "@/router"

export const bootstrap = () => {
  const app = express()

  // Database
  dataSource.initialize()

  // Middlewares
  app.use(
    pino({
      logger
    })
  )
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  app.use(identity)

  // Routing
  app.use("/api/v1/", router)

  // Server
  app.listen(settings.EXPRESS_PORT, settings.EXPRESS_HOST, () => {
    logger.info(`Server is running on ${settings.EXPRESS_HOST}:${settings.EXPRESS_PORT}`)
  })
}
