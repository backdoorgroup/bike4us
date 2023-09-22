import { Router } from "express"

import { serializeListing } from "@/marketplace/serializers"
import { getListings } from "@/marketplace/services"

export const router = Router()

router.get("/listings", async (req, res) => {
  const query = await getListings()
  const listings = query.map((listing) => serializeListing(listing))

  res.json({ listings })
})
