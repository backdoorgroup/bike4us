import { Listing, Order } from "@/listings/models"

export const serializeListing = (listing: Listing) => ({
  ...listing
})

export const serializeOrder = (order: Order) => ({
  ...order
})
