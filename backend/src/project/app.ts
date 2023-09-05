import { NestFactory } from "@nestjs/core"
import { Module, Controller, Get, Injectable } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!"
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

export const createApp = async () => {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document)

  await app.listen(3000)
}
