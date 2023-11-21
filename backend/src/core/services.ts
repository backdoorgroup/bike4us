import admin from "firebase-admin"
import type { FindManyOptions, FindOneOptions } from "typeorm"

import type { TCreateAddressSchema, TCreateListingSchema, TEditListingSchema, TRateListingSchema } from "~/core/schemas"
import { Address, Listing, ListingPicture, Rating } from "~/core/models"

import { settings } from "~/settings"

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: settings.FB_PROJECT_ID,
    clientEmail: settings.FB_CLIENT_EMAIL,
    privateKey: settings.FB_PRIVATE_KEY
  })
})

const auth = firebase.auth()

export const verifyIdToken = async (token: string) => await auth.verifyIdToken(token)

export const getUser = async (uid: string) => await auth.getUser(uid)

export const getListings = async (options?: FindManyOptions<Listing>) => await Listing.find(options)

export const getListing = async (options: FindOneOptions<Listing>) => await Listing.findOneOrFail(options)

export const getAddress = async (options: FindOneOptions<Address>) => await Address.findOneOrFail(options)

export const createListing = async (params: TCreateListingSchema) => {
  const listing = new Listing()

  listing.createdAt = new Date()
  listing.ownerUid = params.ownerUid
  listing.title = params.title
  listing.type = params.type
  listing.material = params.material
  listing.brand = params.brand
  listing.frameSize = params.frameSize
  listing.wheelSize = params.wheelSize
  listing.condition = params.condition
  listing.description = params.description
  listing.hourPricing = params.hourPricing
  listing.pictures = params.pictures.map((picture) => {
    const listingPicture = new ListingPicture()

    listingPicture.listing = listing
    listingPicture.path = picture.filename

    return listingPicture
  })

  return await listing.save()
}

export const createAddress = async (params: TCreateAddressSchema) => {
  const address = new Address()

  address.city = params.city
  address.complement = params.complement
  address.neighborhood = params.neighborhood
  address.number = params.number
  address.ownerUid = params.ownerUid
  address.state = params.state
  address.street = params.street
  address.zipcode = params.zipcode

  return await address.save()
}

export const updateListing = async (listing: Listing, params: TEditListingSchema) => {
  const entries = Object.entries(params) as [keyof TEditListingSchema, never][]

  entries.forEach(([key, value]) => {
    if (!key || !value) return

    listing[key] = value
  })

  return await listing.save()
}

export const createRating = async (listing: Listing, params: TRateListingSchema) => {
  const rating = new Rating()

  rating.listing = listing
  rating.value = params.value
  rating.ownerUid = params.ownerUid

  return await rating.save()
}
