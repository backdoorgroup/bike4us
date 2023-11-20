import { httpClient } from "~/services/clients"
import { ListingsResponse, Listing } from "~/schemas"

import type { ListingForm } from "~/forms"

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

export const getListings = async (params?: { uid?: string; perPage?: number; page?: number }) => {
  const response = await httpClient.get("/listings", { params })

  const parsed = ListingsResponse.parse(response.data)

  return parsed
}
