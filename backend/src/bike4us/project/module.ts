import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import cors from "cors"
import helmet from "helmet"

import { AuthMiddleware } from "bike4us/modules/auth/middlewares"

@Module({
  imports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, cors(), helmet()).forRoutes("*")
  }
}
