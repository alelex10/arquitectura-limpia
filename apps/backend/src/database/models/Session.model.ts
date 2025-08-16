import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "./User.model";
import { Session } from "@domain/entities";
import { Optional } from "sequelize";

type SessionCreationAttributes = Optional<Session, "id">;

@Table({
  tableName: "sessions",
  timestamps: true,
})
export class SessionModel extends Model<Session, SessionCreationAttributes> {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => UserModel)
  
  userId!: string;

  @BelongsTo(() => UserModel)
  
  user?: UserModel;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  token!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expiresAt!: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  userAgent?: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  ip?: string | null;
}
