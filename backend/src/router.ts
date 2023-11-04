import { Router } from "express"

import { router as listingsRouter } from "@/listings/views"
import { router as searchRouter } from "@/search/views"

export const router = Router()

router.use("/listings", listingsRouter)
router.use("/search", searchRouter)
