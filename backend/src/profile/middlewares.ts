import type { NextFunction, Request, Response } from "express"
import type { UserRecord } from "firebase-admin/auth"

import { UnauthorizedException } from "@/exceptions"
import { getUser, verifyIdToken } from "@/profile/services"

import { HttpStatus } from "@lib/http"

export const identity = () =>
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const header = req.header("authorization") as string
      const token = header.replace("Bearer", "").trim()

      const decodedToken = await verifyIdToken(token)
      const user = await getUser(decodedToken.uid)

      req.user = user
    } catch (error) {
      req.user = {} as UserRecord
    }

    next()
  }

export const authenticated = () =>
  function (req: Request, res: Response, next: NextFunction) {
    const user = req.user

    if (!user?.uid) return res.status(HttpStatus.Unauthorized).json(UnauthorizedException)

    next()
  }
