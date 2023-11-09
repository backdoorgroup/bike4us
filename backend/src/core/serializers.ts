import type { IListing, IListingPicture } from "~/core/models"

type SerializedListing = Omit<IListing, "pictures"> & { pictures: Omit<IListingPicture, "listing">[] }
type SerializedListingPicture = Omit<IListingPicture, "listing">

export const serializeListing = (listing: IListing): SerializedListing => ({
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
  pictures: listing.pictures.map((picture) => serializeListingPicture(picture))
})

export const serializeListingPicture = (listingPicture: IListingPicture): SerializedListingPicture => ({
  id: listingPicture.id,
  path: listingPicture.path
})
