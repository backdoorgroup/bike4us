import type { RequestHandler } from "express"
import multer from "multer"
import crypto from "crypto"

import type { TAllowedMimetypes } from "~/core/constants"
import { AllowedMimetypes, MaxFileSize, MaxFiles } from "~/core/constants"
import { getUser, verifyIdToken } from "~/core/services"

import { UnauthorizedException, safeAsync } from "~/handling"
import { settings } from "~/settings"

import { HttpStatus } from "@/http"

export const upload = multer({
  fileFilter: (_req, file, callback) => {
    if (!AllowedMimetypes.includes(file.mimetype as TAllowedMimetypes)) {
      callback(null, false)
    }

    callback(null, true)
  },

  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, settings.EXPRESS_STATIC)
    },

    filename: (_req, file, cb) => {
      const extension = file.mimetype.split("/").at(1)
      const uuid = crypto.randomUUID()

      const filename = `${uuid}.${extension}`

      cb(null, filename)
    }
  }),

  limits: {
    fileSize: MaxFileSize,
    files: MaxFiles
  }
})

export const identity = (): RequestHandler => async (req, _res, next) => {
  const header = req.header("authorization")
  const token = header?.replace("Bearer", "").trim()

  if (!token || !header) {
    req.user = null

    return next()
  }

  const [decodedToken, decodedTokenError] = await safeAsync(verifyIdToken(token))

  if (!decodedToken || decodedTokenError) {
    req.user = null

    return next()
  }

  const [user, userError] = await safeAsync(getUser(decodedToken.uid))

  if (!user || userError) {
    req.user = null

    return next()
  }

  req.user = user

  return next()
}

export const authenticated = (): RequestHandler => (req, res, next) => {
  if (!req.user?.uid) return res.status(HttpStatus.Unauthorized).json(UnauthorizedException)

  return next()
}
