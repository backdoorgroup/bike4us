import { Listing, ListingPicture } from "@/listings/models"

export const serializeListing = (listing: Listing) => ({
  id: listing.id,
  ownerUid: listing.ownerUid,
  createdAt: listing.createdAt,
  updatedAt: listing.updatedAt,
  title: listing.title,
  description: listing.description,
  hourPricing: listing.hourPricing,
  status: listing.status,
  brand: listing.brand,
  condition: listing.condition,
  type: listing.type,
  frameSize: listing.frameSize,
  wheelSize: listing.wheelSize,
  material: listing.material,
  pictures: listing.pictures.map(serializeListingPicture)
})

export const serializeListingPicture = (listingPicture: ListingPicture) => ({
  id: listingPicture.id,
  path: listingPicture.path
})
