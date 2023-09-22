import { Router } from "express"

import { router as marketplaceRouter } from "@/marketplace/views"

export const router = Router()

router.use("/marketplace", marketplaceRouter)
