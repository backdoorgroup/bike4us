import type { Rating, TAddress, TListing, TListingPicture, TRating, TOverallRating } from "~/core/models"

import { truncateFloat } from "~/utils"

export type SerializedListing = Omit<TListing, "pictures"> & { pictures: Omit<TListingPicture, "listing">[] }
export type SerializedListingPicture = Omit<TListingPicture, "listing">
export type SerializedAddress = TAddress
export type SerializedRating = Omit<TRating, "listing">
export type SerializedOverallRating = TOverallRating

export const serializeListing = (listing: TListing): SerializedListing => ({
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
  pictures: listing.pictures && listing.pictures.map((picture) => serializeListingPicture(picture)),
  address: listing.address && serializeAddress(listing.address),
  rating: listing.ratings && serializeOverallRating(listing.ratings),
  owner: listing.owner
})

export const serializeListingPicture = (listingPicture: TListingPicture): SerializedListingPicture => ({
  id: listingPicture.id,
  path: listingPicture.path
})

export const serializeAddress = (address: TAddress): SerializedAddress => ({
  id: address.id,
  city: address.city,
  neighborhood: address.neighborhood,
  number: address.number,
  ownerUid: address.ownerUid,
  state: address.state,
  street: address.street,
  zipcode: address.zipcode,
  complement: address.complement
})

export const serializeRating = (rating: TRating): SerializedRating => ({
  id: rating.id,
  ownerUid: rating.ownerUid,
  value: rating.value
})

export const serializeOverallRating = (ratings: Rating[] | TRating[]): SerializedOverallRating => {
  const distribution = new Map()

  const total = ratings.length

  const values = ratings.map((rating) => {
    const value = distribution.get(rating.value) || 0

    distribution.set(rating.value, value + 1)

    return rating.value
  })
  const average =
    values.reduce((prev, next) => {
      return prev + next
    }, 0) / total

  distribution.forEach((value, key) => {
    const percentage = (value / total) * 100

    distribution.set(key, truncateFloat(percentage))
  })

  return {
    total: total || 0,
    average: truncateFloat(average) || 0,
    distribution: Object.fromEntries(distribution.entries())
  }
}
