import type { TCreateListingSchema } from "@/listings/schemas"
import { Listing } from "@/listings/models"

export const getListings = async () => await Listing.createQueryBuilder().orderBy("Listing.createdAt", "DESC").getMany()

export const getListing = async (id: number) => await Listing.findOneByOrFail({ id })

export const createListing = async ({
  ownerUid,
  title,
  description,
  hourPricing,
  picturePath,
  type,
  brand,
  material,
  wheelSize,
  frameSize,
  condition
}: TCreateListingSchema) => {
  const listing = new Listing()

  listing.ownerUid = ownerUid
  listing.title = title
  listing.type = type
  listing.material = material
  listing.brand = brand
  listing.frameSize = frameSize
  listing.wheelSize = wheelSize
  listing.condition = condition
  listing.description = description
  listing.hourPricing = hourPricing
  listing.picturePath = picturePath
  listing.createdAt = new Date()

  return await listing.save()
}
