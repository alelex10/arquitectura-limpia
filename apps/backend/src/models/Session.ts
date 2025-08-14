import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "sessions",
  timestamps: true,
})
export class Session extends Model<Session> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @BelongsTo(() => User, "userId")
  user?: User;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  token!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expiresAt!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  userAgent?: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  ip?: string | null;
}
