import { Router } from "express"
import { EntityNotFoundError } from "typeorm"
import { ZodError } from "zod"

import { BadRequestException, NotFoundException } from "@/exceptions"
import { paginate } from "@/utils"

import { HttpStatus } from "@lib/http"

import { upload } from "@/listings/middlewares"
import { CreateListingSchema, CreateOrderSchema, GetListingSchema, GetListingsSchema } from "@/listings/schemas"
import { createListing, createOrder, getListing, getListings } from "@/listings/services"

export const router = Router()
export const authenticatedRouter = Router()

router.get("/", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings()
    const listings = paginate(query, params.page, params.perPage)

    res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse(req.params)

    const listing = await getListing(params.id)

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

    res.status(HttpStatus.Ok).json(order)
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

    res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
