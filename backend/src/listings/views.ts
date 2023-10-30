import { Router } from "express"
import { EntityNotFoundError } from "typeorm"

import { BadRequestException, NotFoundException } from "@/exceptions"
import { paginate } from "@/utils"

import { HttpStatus } from "@lib/http"

import { authenticated } from "@/profile/middlewares"

import { upload } from "@/listings/middlewares"
import {
  CreateListingSchema,
  CreateOrderSchema,
  GetListingSchema,
  GetListingsSchema,
  GetOrdersSchema
} from "@/listings/schemas"
import { createListing, createOrder, getListing, getListings, getOrders } from "@/listings/services"

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

router.post("/", authenticated, upload.single("picture"), async (req, res) => {
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

router.post("/:id/order", authenticated, async (req, res) => {
  try {
    const params = CreateOrderSchema.parse({
      id: req.params.id,
      ordererUid: req.user.uid,
      ...req.body
    })

    const listing = await getListing({ where: { id: params.id } })

    if (listing.ownerUid === params.ordererUid) {
      throw new Error()
    }

    const order = await createOrder(listing, params)

    return res.status(HttpStatus.Ok).json(order)
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(HttpStatus.NotFound).json(NotFoundException)
    }

    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

router.get("/orders", authenticated, async (req, res) => {
  try {
    const params = GetOrdersSchema.parse({
      ownerUid: req.user.uid,
      ...req.query
    })

    const query = await getOrders({
      where: { listing: { ownerUid: params.ownerUid } },
      relations: { listing: true }
    })

    const orders = paginate(query, params.page, params.perPage)

    return res.status(HttpStatus.Ok).json({ orders, count: query.length })
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
