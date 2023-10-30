import { Router } from "express"

import { router as listingsRouter } from "@/listings/views"

export const router = Router()

router.use("/listings", listingsRouter)
