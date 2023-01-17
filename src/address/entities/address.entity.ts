import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";

@Table({ tableName: "addresses", timestamps: true })
export class Address extends Model<Address> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT
  })
  user_id: number;


  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING
  })
  city: string;

  @Column({
    type: DataType.STRING
  })
  street: string;

  @Column({
    type: DataType.STRING
  })
  house: string;
}
