import { Router } from "express"

import { paginate } from "@/utils"
import { BadRequestException } from "@/exceptions"

import { HttpStatus } from "@lib/http"

import { CreateListingSchema, GetListingSchema } from "@/marketplace/schemas"
import { serializeListing } from "@/marketplace/serializers"
import { getListings, createListing } from "@/marketplace/services"

export const router = Router()

router.get("/listings", async (req, res) => {
  try {
    const params = GetListingSchema.parse(req.query)

    const query = await getListings()
    const paginated = paginate(query, params.page, params.perPage)
    const listings = paginated.map((listing) => serializeListing(listing))

    res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
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
