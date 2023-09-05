import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./module"

export const createApp = async () => {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document)

  await app.listen(3000)
}
