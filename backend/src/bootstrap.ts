import helmet from "helmet"
import cors from "cors"
import express from "express"

import { identity } from "~/auth/middlewares"
import { dataSource } from "~/database"
import { settings } from "~/settings"

export const bootstrap = () => {
  const app = express()

  // Connect to database
  dataSource.initialize()

  // Third-party middlewares
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  // Local middlewares
  app.use(identity)

  // Run server
  app.listen(settings.EXPRESS_PORT)
}
