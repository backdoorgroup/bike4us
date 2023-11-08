import { Router } from "express"

import { listingsRouter, searchRouter, profileRouter } from "@/core/views"

export const router = Router()

router.use("/listings", listingsRouter)
router.use("/search", searchRouter)
router.use("/profile", profileRouter)
