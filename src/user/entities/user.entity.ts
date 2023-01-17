import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Address } from "../../address/entities/address.entity";
import { Card } from "../../card/entities/card.entity";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
  @Column({
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({})
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({ defaultValue: "src/img/default.jpg" })
  profile_image: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Card)
  cards: Card[]
}
