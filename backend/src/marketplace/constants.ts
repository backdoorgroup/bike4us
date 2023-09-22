export const ListingStatusEnum = {
  Available: "available",
  Rented: "rented"
} as const

export type TListingStatus = (typeof ListingStatusEnum)[keyof typeof ListingStatusEnum]
