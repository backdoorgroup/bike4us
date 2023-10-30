import { Router } from "express"
import { EntityNotFoundError } from "typeorm"

import { BadRequestException, NotFoundException } from "@/exceptions"
import { paginate } from "@/utils"

import { HttpStatus } from "@lib/http"

import { authenticated } from "@/profile/middlewares"

import { upload } from "@/listings/middlewares"
import { CreateListingSchema, GetListingSchema, GetListingsSchema } from "@/listings/schemas"
import { createListing, getListing, getListings } from "@/listings/services"

export const router = Router()

router.get("/", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings({ order: { createdAt: "desc" } })
    const listings = paginate(query, params.page, params.perPage)

    return res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.post("/", authenticated(), upload.single("picture"), async (req, res) => {
  try {
    const body = CreateListingSchema.parse({
      ownerUid: req.user.uid,
      picturePath: req.file?.filename,
      ...req.body
    })

    const listing = await createListing(body)

    return res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse({
      ...req.params
    })

    const listing = await getListing({ where: { id: params.id } })

    return res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(HttpStatus.NotFound).json(NotFoundException)
    }

    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
