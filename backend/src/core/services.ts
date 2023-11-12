import admin from "firebase-admin"
import type { FindManyOptions, FindOneOptions } from "typeorm"

import type { TCreateAddressSchema, TCreateListingSchema } from "~/core/schemas"
import { Address, Listing, ListingPicture } from "~/core/models"

import { settings } from "~/settings"

const client = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: settings.FB_PROJECT_ID,
    clientEmail: settings.FB_CLIENT_EMAIL,
    privateKey: settings.FB_PRIVATE_KEY
  })
})

const auth = client.auth()

export const verifyIdToken = async (token: string) => await auth.verifyIdToken(token)

export const getUser = async (uid: string) => await auth.getUser(uid)

export const getListings = async (options?: FindManyOptions<Listing>) => await Listing.find(options)

export const getListing = async (options: FindOneOptions<Listing>) => await Listing.findOneOrFail(options)

export const getAddress = async (options: FindOneOptions<Address>) => await Address.findOneOrFail(options)

// TODO: Matar esse cara
export const safeGetAddress = async (options: FindOneOptions<Address>) => await Address.findOne(options)

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
