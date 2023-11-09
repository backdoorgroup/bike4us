import type { UserRecord } from "firebase-admin/auth"
import { Column, Entity, ManyToOne, OneToMany } from "typeorm"

import type { ExtractModel } from "~/database"
import { Model } from "~/database"

import type {
  TListingConditionEnum,
  TListingFrameSizeEnum,
  TListingMaterialEnum,
  TListingStatus,
  TListingTypeEnum,
  TListingWheelSizeEnum
} from "~/core/constants"
import {
  ListingConditionEnum,
  ListingFrameSizeEnum,
  ListingMaterialEnum,
  ListingStatusEnum,
  ListingTypeEnum,
  ListingWheelSizeEnum
} from "~/core/constants"

export interface IListing extends ExtractModel<Listing> {
  owner?: UserRecord
}

export interface IListingPicture extends ExtractModel<ListingPicture> {}

@Entity()
export class Listing extends Model {
  @Column({ type: "varchar", length: 128 })
  ownerUid: string

  @Column({ type: "timestamptz", update: false })
  createdAt: Date

  @Column({ type: "timestamptz", nullable: true })
  updatedAt?: Date

  @Column({ type: "varchar", length: 128 })
  title: string

  @Column({ type: "varchar", length: 2048, nullable: true })
  description?: string

  @Column({ type: "integer" })
  hourPricing: number

  @Column({ type: "enum", enum: ListingStatusEnum, default: ListingStatusEnum.Available })
  status: TListingStatus

  @Column({ type: "varchar", length: 512 })
  brand: string

  @Column({ type: "enum", enum: ListingConditionEnum })
  condition: TListingConditionEnum

  @Column({ type: "enum", enum: ListingTypeEnum })
  type: TListingTypeEnum

  @Column({ type: "enum", enum: ListingFrameSizeEnum })
  frameSize: TListingFrameSizeEnum

  @Column({ type: "enum", enum: Object.values(ListingWheelSizeEnum) })
  wheelSize: TListingWheelSizeEnum

  @Column({ type: "enum", enum: ListingMaterialEnum })
  material: TListingMaterialEnum

  @OneToMany(() => ListingPicture, (picture) => picture.listing, { cascade: true })
  pictures: ListingPicture[] | IListingPicture[]
}

@Entity()
export class ListingPicture extends Model {
  @ManyToOne(() => Listing, (listing) => listing.pictures)
  listing: Listing

  @Column({ type: "varchar", length: 512, unique: true })
  path: string
}
