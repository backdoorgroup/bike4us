import helmet from "helmet"
import cors from "cors"
import express from "express"

import { identity } from "~/auth/middlewares"
import { settings } from "~/settings"

export const bootstrap = async () => {
  const app = express()

  // Third-party middlewares
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  // Local middlewares
  app.use(identity)

  app.listen(settings.EXPRESS_PORT)
}
