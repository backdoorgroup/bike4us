import { Router } from "express"

import { authenticated } from "~/auth/middlewares"

export const router = Router()

const unauthenticatedRouter = Router()
const authenticatedRouter = Router().use(authenticated)

router.use(unauthenticatedRouter)
router.use(authenticatedRouter)
