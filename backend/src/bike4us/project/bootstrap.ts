import helmet from "helmet"

import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "bike4us/project/module"
import { settings } from "bike4us/project/settings"

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix("/api/v1")

  app.use(helmet())

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document)

  await app.listen(settings.NEST_PORT)
}
