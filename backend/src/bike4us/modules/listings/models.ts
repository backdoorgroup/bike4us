import { Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
}
