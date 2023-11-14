import { Router } from "express"
import type { UserRecord } from "firebase-admin/auth"
import { ILike } from "typeorm"

import { BadRequestException, NotFoundException, safeAsync } from "~/handling"
import type { Paginated } from "~/pagination"
import { paginate } from "~/pagination"

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
import { createAddress, createListing, getAddress, getListing, getListings, getUser } from "~/core/services"

import { HttpStatus } from "@/http"

export const listingsRouter = Router()
export const searchRouter = Router()
export const profileRouter = Router()

listingsRouter.get("/", async (req, res) => {
  const [params, paramsError] = await safeAsync(GetListingsSchema.parseAsync(req.query))

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const query = await getListings({
    order: {
      createdAt: "desc"
    },
    relations: {
      pictures: true
    }
  })

  const paginated = paginate(query, params.page, params.perPage)
  const listings = paginated.map(serializeListing)

  return res.status(HttpStatus.Ok).json({
    listings,
    count: query.length
  } satisfies Paginated)
})

listingsRouter.post("/", authenticated(), upload.array("pictures[]"), async (req, res) => {
  // TODO: esse endpoint tem um problema, se o usuário enviar algo que quebre na validação dentro desse try catch, o Multer não aborta o upload dos arquivos e ele continua salvando arquivos mortos.
  const [params, paramsError] = await safeAsync(
    CreateListingSchema.parseAsync({
      ownerUid: req.user?.uid,
      pictures: req.files,
      ...req.body
    })
  )

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const [created, createdError] = await safeAsync(createListing(params))

  if (!created || createdError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const listing = serializeListing(created)

  return res.status(HttpStatus.Ok).json(listing)
})

listingsRouter.get("/:id", async (req, res) => {
  const [params, paramsError] = await safeAsync(
    GetListingSchema.parseAsync({
      ...req.params
    })
  )

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const [listingQuery, listingQueryError] = await safeAsync(
    getListing({
      where: {
        id: params.id
      },
      relations: {
        pictures: true,
        address: true
      }
    })
  )

  if (!listingQuery || listingQueryError) {
    return res.status(HttpStatus.NotFound).json(NotFoundException)
  }

  const listing = serializeListing(listingQuery)

  return res.status(HttpStatus.Ok).json(listing)
})

searchRouter.get("/listings", async (req, res) => {
  const [params, paramsError] = await safeAsync(SearchListingsSchema.parseAsync(req.query))

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const query = await getListings({
    where: {
      title: ILike(params.query + "%")
    },
    order: {
      createdAt: "desc"
    },
    relations: {
      pictures: true
    }
  })

  const paginated = paginate(query, params.page, params.perPage)
  const listings = paginated.map(serializeListing)

  return res.status(HttpStatus.Ok).json({
    listings,
    count: query.length
  } satisfies Paginated)
})

profileRouter.get("/", authenticated(), async (req, res) => {
  const user = req.user as UserRecord

  const [query] = await safeAsync(
    getAddress({
      where: {
        ownerUid: user.uid
      }
    })
  )
  const address = query && serializeAddress(query)

  return res.status(HttpStatus.Ok).json({
    user,
    address
  })
})

profileRouter.get("/:uid", async (req, res) => {
  const [params, paramsError] = await safeAsync(
    GetProfileSchema.parseAsync({
      ...req.params
    })
  )

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const [addressQuery] = await safeAsync(
    getAddress({
      where: {
        ownerUid: params.uid
      }
    })
  )
  const [userQuery] = await safeAsync(getUser(params.uid))

  const address = addressQuery && serializeAddress(addressQuery)
  const user = userQuery

  return res.status(HttpStatus.Ok).json({
    user,
    address
  })
})

profileRouter.post("/address", authenticated(), async (req, res) => {
  const [params, paramsError] = await safeAsync(
    CreateAddressSchema.parseAsync({
      ownerUid: req.user?.uid,
      ...req.body
    })
  )

  if (!params || paramsError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const [query, queryError] = await safeAsync(createAddress(params))

  if (!query || queryError) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }

  const address = serializeAddress(query)

  return res.status(HttpStatus.Ok).json(address)
})
