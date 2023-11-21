import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"

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

export type TListing = ExtractModel<Listing>

export type TListingPicture = ExtractModel<ListingPicture>

export type TAddress = ExtractModel<Address>

export type TRating = ExtractModel<Rating>

export type TParsedRating = {
  total: number
  average: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}
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
  pictures: ListingPicture[] | TListingPicture[]

  @ManyToOne(() => Address, (address) => address.ownerUid)
  @JoinColumn({ name: "ownerUid", referencedColumnName: "ownerUid" })
  address: Address | TAddress

  @OneToMany(() => Rating, (rating) => rating.listing, { nullable: true })
  ratings?: Rating[] | TRating[]

  rating?: TParsedRating
}

@Entity()
export class ListingPicture extends Model {
  @ManyToOne(() => Listing, (listing) => listing.pictures)
  listing: Listing

  @Column({ type: "varchar", length: 512, unique: true })
  path: string
}

@Entity()
export class Address extends Model {
  @Column({ type: "varchar", length: 64 })
  city: string

  @Column({ type: "varchar", length: 256, nullable: true })
  complement?: string

  @Column({ type: "varchar", length: 256 })
  neighborhood: string

  @Column({ type: "varchar", length: 16 })
  number: string

  @Column({ type: "varchar", length: 128, unique: true })
  ownerUid: string

  @Column({ type: "varchar", length: 32 })
  state: string

  @Column({ type: "varchar", length: 256 })
  street: string

  @Column({ type: "char", length: 8 })
  zipcode: string
}

@Entity()
export class Rating extends Model {
  @Column({ type: "integer" })
  value: number

  @Column({ type: "varchar", length: 128 })
  ownerUid: string

  @ManyToOne(() => Listing, (listing) => listing.ratings)
  listing: Listing | TListing
}
