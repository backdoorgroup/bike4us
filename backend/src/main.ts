import "reflect-metadata"
import "tsconfig-paths/register"
import "dotenv/config"

import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import { identity } from "~/core/middlewares"

import { dataSource } from "~/database"
import { logger } from "~/logger"
import { router } from "~/router"
import { settings } from "~/settings"

export const bootstrap = () => {
  const app = express()

  // Database
  dataSource.initialize()

  // Third-party Middlewares
  app.use("/static", express.static(settings.EXPRESS_STATIC))
  app.use(
    morgan("tiny", {
      stream: {
        write: (message) => logger.http(message.trim())
      }
    })
  )
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  // Local Middlewares
  app.use(identity())

  // Routing
  app.use("/api/v1/", router)

  // Server
  app.listen(settings.EXPRESS_PORT, settings.EXPRESS_HOST, () => {
    logger.info(`Server is running on http://${settings.EXPRESS_HOST}:${settings.EXPRESS_PORT}`)
  })
}

bootstrap()
