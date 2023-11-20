// Database
export const ListingStatusEnum = {
  Available: "available",
  Rented: "rented"
} as const
export type TListingStatus = (typeof ListingStatusEnum)[keyof typeof ListingStatusEnum]

export const ListingConditionEnum = {
  New: "new",
  UsedLikeNew: "used-like-new",
  UsedGood: "used-good",
  UsedFair: "used-fair"
} as const
export type TListingConditionEnum = (typeof ListingConditionEnum)[keyof typeof ListingConditionEnum]

export const ListingTypeEnum = {
  MTB: "mtb",
  BMX: "bmx",
  Urban: "urban",
  Electric: "electric",
  Cruiser: "cruiser"
} as const
export type TListingTypeEnum = (typeof ListingTypeEnum)[keyof typeof ListingTypeEnum]

export const ListingFrameSizeEnum = {
  S: "s",
  M: "m",
  L: "l",
  XL: "xl"
} as const
export type TListingFrameSizeEnum = (typeof ListingFrameSizeEnum)[keyof typeof ListingFrameSizeEnum]

export const ListingWheelSizeEnum = {
  "12": "12",
  "14": "14",
  "16": "16",
  "20": "20",
  "22": "22",
  "24": "24",
  "26": "26",
  "27": "27",
  "27.5": "27.5",
  "28": "28",
  "29": "29"
} as const
export type TListingWheelSizeEnum = (typeof ListingWheelSizeEnum)[keyof typeof ListingWheelSizeEnum]

export const ListingMaterialEnum = {
  Aluminum: "aluminum",
  CarbonFiber: "carbon-fiber",
  Steel: "steel",
  Titanium: "titanium"
} as const
export type TListingMaterialEnum = (typeof ListingMaterialEnum)[keyof typeof ListingMaterialEnum]

// Media
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

export const MaxFileSize = 5 * 1024 * 1024 // Value in bytes (5MB)
export const MaxFiles = 5
