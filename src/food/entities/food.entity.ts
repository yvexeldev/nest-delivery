import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Branch } from "../../branch/entities/branch.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";

@Table({ tableName: "foods", timestamps: true })
export class Food extends Model<Food> {
  @Column({
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT
  })
  id: number;

  @Column({
    type: DataType.STRING
  })
  name: string;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @Column({
    type: DataType.STRING
  })
  photo: string;

  @Column({
    type: DataType.DECIMAL
  })
  price: number;

  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER
  })
  restaurant_id: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ForeignKey(() => Branch)
  @Column({
    type: DataType.INTEGER
  })
  branch_id: number;

  @BelongsTo(() => Branch)
  branch: Restaurant;
}
