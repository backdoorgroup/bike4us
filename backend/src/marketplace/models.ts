import type { UUID } from "crypto"
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"

import type { TListingStatus } from "@/marketplace/constants"
import { ListingStatusEnum } from "@/marketplace/constants"

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "uuid" })
  ownerUid: UUID

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date

  @UpdateDateColumn({ type: "timestamptz", nullable: true, default: null })
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

  @OneToMany(() => Rental, (rental) => rental.listing)
  rentals: Rental[]

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

@Entity()
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Listing, (listing) => listing.rentals, { nullable: false })
  listing: Listing

  @Column({ type: "uuid" })
  tenantUid: UUID

  @Column({ type: "timestamptz" })
  checkIn: Date

  @Column({ type: "timestamptz" })
  checkOut: Date
}