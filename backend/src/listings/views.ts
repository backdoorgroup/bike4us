import { Router } from "express"
import { EntityNotFoundError } from "typeorm"
import { ZodError } from "zod"

import { BadRequestException, NotFoundException } from "@/exceptions"
import { paginate } from "@/utils"

import { HttpStatus } from "@lib/http"

import { upload } from "@/listings/middlewares"
import { CreateListingSchema, CreateOrderSchema, GetListingSchema, GetListingsSchema } from "@/listings/schemas"
import { serializeListing, serializeOrder } from "@/listings/serializers"
import { createListing, createOrder, getListing, getListings } from "@/listings/services"

export const router = Router()
export const authenticatedRouter = Router()

router.get("/", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings()
    const paginated = paginate(query, params.page, params.perPage)
    const listings = paginated.map((listing) => serializeListing(listing))

    res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse(req.params)

    const query = await getListing(params.id)
    const listing = serializeListing(query)

    res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    if (error instanceof ZodError) return res.status(HttpStatus.BadRequest).json(BadRequestException)

    if (error instanceof EntityNotFoundError) return res.status(HttpStatus.NotFound).json(NotFoundException)
  }
})

authenticatedRouter.post("/:id/order", async (req, res) => {
  try {
    const params = CreateOrderSchema.parse({
      id: req.params.id,
      ownerUid: req.user.uid,
      ...req.body
    })

    const listing = await getListing(params.id)
    const order = await createOrder(listing, params)

    const serialized = serializeOrder(order)

    res.status(HttpStatus.Ok).json(serialized)
  } catch (error) {
    if (error instanceof ZodError) return res.status(HttpStatus.BadRequest).json(BadRequestException)

    if (error instanceof EntityNotFoundError) return res.status(HttpStatus.NotFound).json(NotFoundException)
  }
})

authenticatedRouter.post("/", upload.single("picture"), async (req, res) => {
  try {
    const body = CreateListingSchema.parse({
      ownerUid: req.user.uid,
      picturePath: req.file?.filename,
      ...req.body
    })

    const listing = await createListing(body)
    const serialized = serializeListing(listing)

    res.status(HttpStatus.Ok).json(serialized)
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
