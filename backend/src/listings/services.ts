import type { TCreateListingSchema } from "@/listings/schemas"
import { Listing } from "@/listings/models"

export const getListings = async () => await Listing.createQueryBuilder().orderBy("Listing.createdAt", "DESC").getMany()

export const getListing = async (id: number) => await Listing.findOneByOrFail({ id })

export const createListing = async ({
  ownerUid,
  title,
  description,
  hourPricing,
  picturePath
}: TCreateListingSchema) => {
  const listing = new Listing()

  listing.ownerUid = ownerUid
  listing.title = title
  listing.description = description
  listing.hourPricing = hourPricing
  listing.picturePath = picturePath
  listing.createdAt = new Date()

  return await listing.save()
}
