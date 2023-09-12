import type { Request, Response, NextFunction } from "express"
import { Injectable, NestMiddleware } from "@nestjs/common"

import { auth } from "bike4us/modules/auth/services"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.header("authorization")
    token = token?.replace("Bearer", "")
    token = token?.trim()

    if (!token) {
      req.user = {}

      next()

      return
    }

    try {
      const user = await auth.verifyIdToken(token)

      req.user = user
    } catch (e) {}

    next()
  }
}
