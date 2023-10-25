import { httpClient } from "@/services/clients"

import { transform } from "@/utils"
import { ListingForm } from "@/forms"

const createListing = async (listing: ListingForm) => {
  const form = transform({
    ...listing,
    picture: listing.picture.item(0)
  })

  return await httpClient.post("/listings", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const getListings = async () => {
  return await httpClient.get("/listings")
}

export const ListingsServices = {
  // TODO: tipar com zod
  createListing,
  getListings
}
