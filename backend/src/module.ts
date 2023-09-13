import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { DatabaseModule } from "~/database"
import { IdentityMiddleware } from "~/auth/middlewares"

@Module({
  imports: [DatabaseModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes("*")
  }
}
