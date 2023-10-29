import type { FindManyOptions, FindOneOptions } from "typeorm"

import type { TCreateListingSchema, TCreateOrderSchema } from "@/listings/schemas"
import { Listing, Order } from "@/listings/models"

export const getListings = async (options?: FindManyOptions<Listing>) => await Listing.find(options)

export const getListing = async (options: FindOneOptions<Listing>) => await Listing.findOneOrFail(options)

export const createListing = async (data: TCreateListingSchema) => {
  const listing = new Listing()

  listing.createdAt = new Date()
  listing.ownerUid = data.ownerUid
  listing.title = data.title
  listing.type = data.type
  listing.material = data.material
  listing.brand = data.brand
  listing.frameSize = data.frameSize
  listing.wheelSize = data.wheelSize
  listing.condition = data.condition
  listing.description = data.description
  listing.hourPricing = data.hourPricing
  listing.picturePath = data.picturePath

  return await listing.save()
}

export const createOrder = async (listing: Listing, data: TCreateOrderSchema) => {
  const order = new Order()

  order.createdAt = new Date()
  order.listing = listing
  order.from = data.from
  order.to = data.to
  order.ordererUid = data.ordererUid

  return await order.save()
}
