import helmet from "helmet"
import cors from "cors"
import express from "express"

import { identity } from "src/auth/middlewares"
import { dataSource } from "src/database"
import { settings } from "src/settings"
import { router } from "src/router"

export const bootstrap = () => {
  const app = express()

  // Database
  dataSource.initialize()

  // Middlewares
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  app.use(identity)

  // Routing
  app.use("/api/v1/", router)

  // Server
  app.listen(settings.EXPRESS_PORT, settings.EXPRESS_HOST)
}
