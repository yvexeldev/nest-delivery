import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";

import { Food } from "../../food/entities/food.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";

@Table({ tableName: "branches", timestamps: true })
export class Branch extends Model<Branch> {
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
  name: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ForeignKey(() => Restaurant)
  @Column({
    type: DataType.INTEGER,
  })
  restaurant_id: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @HasMany(() => Food)
  foods: Food[];
}
