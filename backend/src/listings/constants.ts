export const ListingStatusEnum = {
  Available: "available"
} as const

export type TListingStatus = (typeof ListingStatusEnum)[keyof typeof ListingStatusEnum]
