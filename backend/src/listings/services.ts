import type { FindManyOptions, FindOneOptions } from "typeorm"

import type { TCreateListingSchema } from "@/listings/schemas"
import { Listing } from "@/listings/models"

export const getListings = async (options?: FindManyOptions<Listing>) => await Listing.find(options)

export const getListing = async (options: FindOneOptions<Listing>) => await Listing.findOneOrFail(options)

export const createListing = async (schema: TCreateListingSchema) => {
  const listing = new Listing()

  listing.createdAt = new Date()
  listing.ownerUid = schema.ownerUid
  listing.title = schema.title
  listing.type = schema.type
  listing.material = schema.material
  listing.brand = schema.brand
  listing.frameSize = schema.frameSize
  listing.wheelSize = schema.wheelSize
  listing.condition = schema.condition
  listing.description = schema.description
  listing.hourPricing = schema.hourPricing
  listing.picturePath = schema.picturePath

  return await listing.save()
}
