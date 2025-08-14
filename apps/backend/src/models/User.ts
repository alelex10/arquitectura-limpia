import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  HasMany
} from "sequelize-typescript";
import { Document } from "./Document";
import { Session } from "./Session";
import {User as UserEntity} from "domain/entities/User";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

@Table({
	tableName: "users",
	timestamps: true,
})
export class User extends Model<UserEntity> {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	username!: string;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	passwordHash!: string;

	@Column({ type: DataType.ENUM(...Object.values(UserRole)), defaultValue: UserRole.USER })
	role!: UserRole;

	@HasMany(() => Document, "ownerId")
	documents?: Document[];

	@HasMany(() => Session, "userId")
	sessions?: Session[];
}


