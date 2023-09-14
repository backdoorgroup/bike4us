import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
}
