import helmet from "helmet"
import cors from "cors"

import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "~/module"
import { settings } from "~/settings"

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("/api/v1")

  app.use(cors())
  app.use(helmet())

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document)

  await app.listen(settings.NEST_PORT)
}
