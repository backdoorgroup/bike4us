import helmet from "helmet"
import cors from "cors"
import express from "express"

import { settings } from "~/settings"

export const bootstrap = async () => {
  const app = express()

  app.use(cors())
  app.use(helmet())

  app.listen(settings.EXPRESS_PORT)
}
