import { httpClient } from "@/services/clients"
import { ListingForm } from "@/schemas"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transform = (params: { [key: string]: any }) => {
  params = params || {}

  const formData = new FormData()

  Object.entries(params).forEach(([key, value]) => {
    if (!value || !key) return

    formData.append(key, value)
  })

  return formData
}

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
