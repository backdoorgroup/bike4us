import type { TCreateListingSchema } from "@/marketplace/schemas"
import { Listing } from "@/marketplace/models"

export const getListings = async () => await Listing.find()

export const createListing = async ({ ownerUid, title, description, hourPricing }: TCreateListingSchema) => {
  const listing = new Listing()

  listing.ownerUid = ownerUid
  listing.title = title
  listing.description = description
  listing.hourPricing = hourPricing
  listing.createdAt = new Date()

  return await listing.save()
}
