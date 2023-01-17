import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
import { Deliver } from "../../deliver/entities/deliver.entity";
import { Address } from "../../address/entities/address.entity";
import { Food } from "../../food/entities/food.entity";

@Table({
  tableName: "orders",
  timestamps: true

})
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  user_id: number;

  @ForeignKey(() => Deliver)
  @Column({
    type: DataType.INTEGER
  })
  deliver_id: number;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER
  })
  address_id: number;

  @Column({
    type: DataType.DATE
  })
  date: Date;


  @ForeignKey(() => Food)

  @Column({
    type: DataType.INTEGER
  })
  food: number;

  @Column({
    type: DataType.INTEGER
  })
  number_of_food: number;

  @Column({
    type: DataType.DECIMAL
  })
  total_amount: number;

  @Column({
    type: DataType.TEXT
  })
  comment: string;

  @Column({
    type: DataType.STRING

  })
  status: "PENDING" | "PAID" | "CANCELLED";

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Deliver)
  deliver: Deliver;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsTo(() => Food)
  foodd: Food
}
