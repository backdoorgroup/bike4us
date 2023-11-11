import { Router } from "express"
import { EntityNotFoundError, ILike } from "typeorm"

import type { Paginated } from "~/pagination"
import { paginate } from "~/pagination"
import { BadRequestException, NotFoundException } from "~/exceptions"

import { authenticated, upload } from "~/core/middlewares"
import {
  CreateAddressSchema,
  CreateListingSchema,
  GetListingSchema,
  GetListingsSchema,
  GetProfileSchema,
  SearchListingsSchema
} from "~/core/schemas"
import { serializeAddress, serializeListing } from "~/core/serializers"
import { createAddress, createListing, getListing, getListings, getUser, safeGetAddress } from "~/core/services"

import { HttpStatus } from "@/http"

export const listingsRouter = Router()
export const searchRouter = Router()
export const profileRouter = Router()

listingsRouter.get("/", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings({ order: { createdAt: "desc" }, relations: { pictures: true } })
    const paginated = paginate(query, params.page, params.perPage)
    const listings = paginated.map(serializeListing)

    return res.status(HttpStatus.Ok).json({ listings, count: query.length } as Paginated)
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

listingsRouter.post("/", authenticated(), upload.array("pictures[]"), async (req, res) => {
  try {
    /*
     * TODO: esse endpoint tem um problema.
     * se o usuário enviar algo que quebre na validação dentro desse try catch,
     * o Multer não aborta o upload dos arquivos e ele continua salvando arquivos mortos.
     */
    const params = CreateListingSchema.parse({
      ownerUid: req.user?.uid,
      pictures: req.files,
      ...req.body
    })

    const query = await createListing(params)
    const listing = serializeListing(query)

    return res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

listingsRouter.get("/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse({
      ...req.params
    })

    const listingQuery = await getListing({ where: { id: params.id }, relations: { pictures: true } })
    const listing = serializeListing(listingQuery)

    const addressQuery = await safeGetAddress({ where: { ownerUid: listing.ownerUid } })
    const address = addressQuery ? serializeAddress(addressQuery) : null

    listing.address = address

    return res.status(HttpStatus.Ok).json(listing)
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(HttpStatus.NotFound).json(NotFoundException)
    }

    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

searchRouter.get("/listings", async (req, res) => {
  try {
    const params = SearchListingsSchema.parse(req.query)

    const query = await getListings({
      where: { title: ILike(`%${params.query}%`) },
      order: { createdAt: "desc" },
      relations: { pictures: true }
    })
    const paginated = paginate(query, params.page, params.perPage)
    const listings = paginated.map(serializeListing)

    return res.status(HttpStatus.Ok).json({ listings, count: query.length } as Paginated)
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

profileRouter.get("/", async (req, res) => {
  const user = req.user

  const query = user?.uid ? await safeGetAddress({ where: { ownerUid: user?.uid } }) : null
  const address = query ? serializeAddress(query) : null

  return res.status(HttpStatus.Ok).json({ user, address })
})

profileRouter.get("/:uid", async (req, res) => {
  try {
    const params = GetProfileSchema.parse({
      ...req.params
    })

    const addressPromise = safeGetAddress({ where: { ownerUid: params.uid } })
    const userPromise = getUser(params.uid)

    const [addressQuery, userQuery] = await Promise.all([addressPromise, userPromise])

    const address = addressQuery ? serializeAddress(addressQuery) : null
    const user = userQuery

    return res.status(HttpStatus.Ok).json({ user, address })
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

profileRouter.post("/address", authenticated(), async (req, res) => {
  try {
    const params = CreateAddressSchema.parse({
      ownerUid: req.user?.uid,
      ...req.body
    })

    const query = await createAddress(params)
    const address = serializeAddress(query)

    res.status(HttpStatus.Ok).json(address)
  } catch (error) {
    res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
