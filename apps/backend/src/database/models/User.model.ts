import { CreateOptions, ForeignKey, Optional } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User, UserRole } from "@domain/entities";
import { SessionModel } from "./Session.model";
import { DocumentModel } from "./Document.model";

type UserCreationAttributes = Optional<User, "id">;

@Table({
  tableName: "users",
  timestamps: true,
})
export class UserModel extends Model<User, UserCreationAttributes> {
  
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true })
  id!: string;

  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash!: string;

  @HasMany(() => SessionModel)
  sessions?: SessionModel[];

  @HasMany(() => DocumentModel, "ownerId")
  documents?: DocumentModel[];

  role!: UserRole;
  @CreatedAt
  createdAt?: Date;
  @UpdatedAt
  updatedAt?: Date;
}
