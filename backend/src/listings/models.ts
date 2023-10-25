import { Entity, Column, Check } from "typeorm"

import { Model } from "@/database"

import type { TListingStatus, TListingConditionEnum, TListingTypeEnum, TListingFrameSizeEnum, TListingWheelSizeEnum, TListingMaterialEnum } from "@/listings/constants"
import { ListingStatusEnum, ListingConditionEnum, ListingTypeEnum, ListingFrameSizeEnum, ListingWheelSizeEnum, ListingMaterialEnum } from "@/listings/constants"

@Entity()
export class Listing extends Model {
  @Column({ type: "varchar", length: 128 })
  ownerUid: string

  @Column({ type: "timestamptz", update: false })
  createdAt: Date

  @Column({ type: "timestamptz", nullable: true, default: null })
  updatedAt: Date

  @Column({ type: "varchar", length: 128 })
  title: string

  @Column({ type: "varchar", length: 2048, nullable: true })
  description: string

  @Column({ type: "integer" })
  @Check(`"hourPricing" > 0`)
  hourPricing: number

  @Column({ type: "enum", enum: ListingStatusEnum, default: ListingStatusEnum.Available })
  status: TListingStatus

  @Column({ type: "varchar", length: 512, unique: true })
  picturePath: string

  @Column({ type: "varchar", length: 512 })
  brand: string

  @Column({ type: "enum", enum: ListingConditionEnum })
  condition: TListingConditionEnum

  @Column({ type: "enum", enum: ListingTypeEnum })
  type: TListingTypeEnum

  @Column({ type: "enum", enum: ListingFrameSizeEnum })
  frameSize: TListingFrameSizeEnum

  @Column({ type: "enum", enum: ListingWheelSizeEnum })
  wheelSize: TListingWheelSizeEnum

  @Column({ type: "enum", enum: ListingMaterialEnum })
  material: TListingMaterialEnum

}
