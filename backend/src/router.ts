import { Router } from "express"

import { authenticated } from "@/profile/middlewares"
import { router as listingsRouter, authenticatedRouter as listingsAuthenticatedRouter } from "@/listings/views"

// Use this router if you want to allow unauthenticated access the endpoint
export const router = Router()

// Use this if you want to allow only authenticated access the endpoint
const authenticatedRouter = Router().use(authenticated)

router.use("/listings", listingsRouter)
authenticatedRouter.use("/listings", listingsAuthenticatedRouter)

router.use(authenticatedRouter)
