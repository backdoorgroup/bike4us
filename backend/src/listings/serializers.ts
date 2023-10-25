import { Listing } from "@/listings/models"

export const serializeListing = (listing: Listing) => ({
  ...listing
})
