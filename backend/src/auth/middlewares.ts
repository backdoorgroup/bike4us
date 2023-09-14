import type { Request, Response, NextFunction } from "express"
import type { UserRecord } from "firebase-admin/auth"

import { HttpStatus } from "~/helpers"
import { auth } from "~/auth/services"

export const identity = async function (req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization")
  const token = header?.replace("Bearer", "")?.trim()

  if (!token) {
    req.user = {}

    return next()
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    const user = await auth.getUser(decodedToken.uid)

    req.user = user
  } catch (e) {
    req.user = {}
  }

  return next()
}

export const authenticated = function (req: Request, res: Response, next: NextFunction) {
  const user = req.user as UserRecord

  if (user?.uid) return next()

  res.status(HttpStatus.Unauthorized).json({ message: "Unauthorized" })

  return next()
}
