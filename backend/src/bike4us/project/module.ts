import type { Request } from "express"
import { MiddlewareConsumer, Module, Controller, Get, Req, NestModule } from "@nestjs/common"

import { AuthMiddleware } from "bike4us/modules/auth/middlewares"

// TODO: REMOVER ISSO, É SÓ TESTE
@Controller()
class TestController {
  @Get("/teste")
  test(@Req() req: Request) {
    return {
      user: req.user
    }
  }
}

@Module({
  imports: [],
  controllers: [TestController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*")
  }
}
