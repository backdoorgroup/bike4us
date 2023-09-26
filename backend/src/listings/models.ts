import { Entity, Column, Check, OneToMany, ManyToOne } from "typeorm"

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

  @OneToMany(() => ListingPicture, (picture) => picture.listing)
  pictures: ListingPicture[]

  // marca
  // cor
  // categoria/tipo da bicicleta
  // material
  // tamanho do quadro
  // tamanho do aro
}

@Entity()
export class ListingPicture extends Model {
  @ManyToOne(() => Listing, (listing) => listing.pictures, { nullable: false })
  listing: Listing

  @Column({ type: "varchar", length: 512 })
  picturePath: string
}
