import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Check, OneToMany, ManyToOne } from "typeorm"

import type { TListingStatus } from "@/marketplace/constants"
import { ListingStatusEnum } from "@/marketplace/constants"

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "uuid" })
  ownerUid: string

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
export class ListingPicture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Listing, (listing) => listing.pictures, { nullable: false })
  listing: Listing

  @Column({ type: "varchar", length: 512 })
  picturePath: string
}
