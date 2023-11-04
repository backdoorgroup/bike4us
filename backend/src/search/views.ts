import { Router } from "express"
import { ILike } from "typeorm"

import { BadRequestException } from "@/exceptions"
import { paginate } from "@/utils"

import { HttpStatus } from "@lib/http"

import { getListings } from "@/listings/services"

import { SearchListingsSchema } from "@/search/schemas"

export const router = Router()

router.get("/listings", async (req, res) => {
  try {
    const params = SearchListingsSchema.parse(req.query)

    const query = await getListings({
      where: {
        title: ILike(`%${params.query}%`)
      },
      order: {
        createdAt: "desc"
      }
    })
    const listings = paginate(query, params.page, params.perPage)

    return res.status(HttpStatus.Ok).json({ listings, count: query.length })
  } catch (error) {
    return res.status(HttpStatus.BadRequest).json(BadRequestException)
  }
})
