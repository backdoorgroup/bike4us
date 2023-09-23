import { Router } from "express"

import { BadRequestException } from "@/exceptions"

import { HttpStatus } from "@lib/http"

import { CreateListingSchema } from "@/marketplace/schemas"
import { serializeListing } from "@/marketplace/serializers"
import { getListings, createListing } from "@/marketplace/services"

export const router = Router()

router.get("/listings", async (req, res) => {
  // TODO: isso aqui precisa de paginação
  const query = await getListings()
  const listings = query.map((listing) => serializeListing(listing))

  res.status(HttpStatus.Ok).json({ listings })
})

router.post("/listings", async (req, res) => {
  try {
    const body = CreateListingSchema.parse(req.body)

    const listing = await createListing(body)
    const serialized = serializeListing(listing)

    res.status(HttpStatus.Ok).json(serialized)
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
