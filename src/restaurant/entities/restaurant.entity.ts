import { Column, Model, DataType, HasMany, Table } from "sequelize-typescript";
import { Branch } from "src/branch/entities/branch.entity";
@Table({ tableName: "restaurants", timestamps: true })
export class Restaurant extends Model<Restaurant> {
  @Column({
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact_num: string;

  @Column({ type: DataType.TIME })
  open_time: string;

  @Column({ type: DataType.TIME })
  close_time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  photo: string;

  @HasMany(() => Branch)
  branches: Branch[];
}
