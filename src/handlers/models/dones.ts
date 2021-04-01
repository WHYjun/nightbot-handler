import {
  Column,
  PrimaryKey,
  Table,
  Model,
  CreatedAt,
  DataType,
  UpdatedAt,
} from "sequelize-typescript";

@Table
export class Dones extends Model<Dones> {
  @PrimaryKey
  @Column({ type: DataType.NUMBER })
  todoId!: number;

  @Column({ type: DataType.STRING })
  user!: string;

  @Column({ type: DataType.STRING })
  todo!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt?: Date;
}
