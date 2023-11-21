import { httpClient } from "~/services/clients"
import { ListingsResponse, Listing, Status, Rating } from "~/schemas"

import type { ListingForm, RateListingForm } from "~/forms"

export const createListing = async (listing: ListingForm) => {
  const response = await httpClient.postForm("/listings", listing)

  const parsed = Listing.parse(response.data)

  return parsed
}

export const getListing = async (id: number | string) => {
  const response = await httpClient.get(`/listings/${id}`)

  const parsed = Listing.parse(response.data)

  return parsed
}

export const rateListing = async (id: number | string, rating: RateListingForm) => {
  const response = await httpClient.post(`/listings/${id}/rate`, rating)

  const parsed = Rating.parse(response.data)

  return parsed
}

export const getListings = async (params?: {
  uid?: string
  perPage?: number
  page?: number
  status?: keyof typeof Status
}) => {
  const response = await httpClient.get("/listings", { params })

  const parsed = ListingsResponse.parse(response.data)

  return parsed
}

export const updateListing = async (id: number | string, data: unknown) => {
  const response = await httpClient.patch(`/listings/${id}`, data)

  const parsed = Listing.omit({ pictures: true, address: true }).parse(response.data)

  return parsed
}
