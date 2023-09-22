import type { NextFunction, Request, Response } from "express"
import type { UserRecord } from "firebase-admin/auth"

import { auth } from "@/auth/services"
import { UnauthorizedException } from "@/exceptions"
import { HttpStatus } from "@lib/http"

export const identity = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization") as string
    const token = header.replace("Bearer", "").trim()

    const decodedToken = await auth.verifyIdToken(token)
    const user = await auth.getUser(decodedToken.uid)

    req.user = user
  } catch (error) {
    req.user = {} as UserRecord
  }

  next()
}

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
  const user = req.user

  if (!user?.uid) res.status(HttpStatus.Unauthorized).json(UnauthorizedException)

  next()
}
