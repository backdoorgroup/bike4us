import { Router } from "express"
import { EntityNotFoundError, ILike } from "typeorm"

import { BadRequestException, NotFoundException } from "@/exceptions"
import { paginate } from "@/utils"

import { authenticated, upload } from "@/core/middlewares"
import { CreateListingSchema, GetListingSchema, GetListingsSchema, SearchListingsSchema } from "@/core/schemas"
import { serializeListing } from "@/core/serializers"
import { createListing, getListing, getListings } from "@/core/services"

import { HttpStatus } from "@lib/http"

export const listingsRouter = Router()
export const searchRouter = Router()
export const profileRouter = Router().use(authenticated())

listingsRouter.get("/", async (req, res) => {
  try {
    const params = GetListingsSchema.parse(req.query)

    const query = await getListings({ order: { createdAt: "desc" }, relations: { pictures: true } })
    const listings = paginate(query, params.page, params.perPage)

    return res.status(HttpStatus.Ok).json({
      listings: listings.map(serializeListing),
      count: query.length
    })
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
      ownerUid: req.user.uid,
      pictures: req.files,
      ...req.body
    })

    const listing = await createListing(params)

    return res.status(HttpStatus.Ok).json(serializeListing(listing))
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})

listingsRouter.get("/:id", async (req, res) => {
  try {
    const params = GetListingSchema.parse({
      ...req.params
    })

    const listing = await getListing({ where: { id: params.id }, relations: { pictures: true } })

    return res.status(HttpStatus.Ok).json(serializeListing(listing))
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
    const listings = paginate(query, params.page, params.perPage)

    return res.status(HttpStatus.Ok).json({
      listings: listings.map(serializeListing),
      count: query.length
    })
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
