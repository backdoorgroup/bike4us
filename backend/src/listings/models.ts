import { Entity, Column, Check } from "typeorm"

import { Model } from "@/database"

import type { TListingStatus } from "@/listings/constants"
import { ListingStatusEnum } from "@/listings/constants"

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

  @Column({ type: "varchar", length: 2048 })
  description: string

  @Column({ type: "integer" })
  @Check(`"hourPricing" > 0`)
  hourPricing: number

  @Column({ type: "enum", enum: ListingStatusEnum, default: ListingStatusEnum.Available })
  status: TListingStatus

  @Column({ type: "varchar", length: 512, unique: true })
  picturePath: string
}
