import { Listing, ListingsResponse, ReducedListing } from "~/schemas"
import { httpClient } from "~/services/clients"

import type { ListingForm } from "~/forms"

export const createListing = async (listing: ListingForm) => {
  const response = await httpClient.postForm("/listings", listing)

  const parsed = ReducedListing.parse(response.data)

  return parsed
}

export const getListing = async (id: number | string) => {
  const response = await httpClient.get(`/listings/${id}`)

  const parsed = Listing.parse(response.data)

  return parsed
}

export const getListings = async () => {
  const response = await httpClient.get("/listings")

  const parsed = ListingsResponse.parse(response.data)

  return parsed
}
