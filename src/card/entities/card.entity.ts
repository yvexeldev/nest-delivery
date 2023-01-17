import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";

@Table({
  tableName: "Cards",
  timestamps: true
})
export class Card extends Model<Card> {
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

  @Column({
    type: DataType.STRING
  })
  card_type: string;

  @Column({
    type: DataType.STRING,
    unique: true
    
  })
  number: string;

  @Column({
    type: DataType.INTEGER
  })
  month: number;

  @Column({
    type: DataType.INTEGER
  })
  year: number;

  @BelongsTo(() => User)
  user: User;
}
