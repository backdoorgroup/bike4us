export const ListingStatusEnum = {
  Available: "available"
} as const

export type TListingStatus = (typeof ListingStatusEnum)[keyof typeof ListingStatusEnum]

export const AllowedMimetypesMap = {
  png: "image/png",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  webp: "image/webp"
} as const
export type TAllowedMimetypes = (typeof AllowedMimetypesMap)[TAllowedExtensions]
export type TAllowedExtensions = keyof typeof AllowedMimetypesMap

export const AllowedMimetypes = Object.values(AllowedMimetypesMap)
export const AllowedExtensions = Object.keys(AllowedMimetypesMap)
