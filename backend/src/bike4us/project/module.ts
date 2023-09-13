import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { IdentityMiddleware } from "bike4us/modules/auth/middlewares"

@Module({
  imports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes("*")
  }
}
