import {
	Table,
	Model,
	Column,
	DataType,
	PrimaryKey,
	Default,
	ForeignKey,
	BelongsTo,
	HasMany,
} from "sequelize-typescript";
import { DocumentVersionModel } from "./DocumentVersion.model";
import { Document } from "@domain/entities";
// import { DocumentCollaboratorModel } from "./DocumentCollaborator.model";
import { UserModel } from "./User.model";
import { Optional } from "sequelize";

type DocumentAttributes = Optional<Document, "id">;

@Table({
	tableName: "documents",
	timestamps: true,
})
export class DocumentModel extends Model<Document, DocumentAttributes> {
	@Default(DataType.UUIDV4)
	@Column({
		type: DataType.UUID,
		primaryKey: true,
	})
	id!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	title!: string;

	@Column({ type: DataType.TEXT, allowNull: true })
	content?: string;

	@ForeignKey(() => UserModel)
	ownerId!: string;

	@BelongsTo(() => UserModel, "ownerId")
	owner?: UserModel;

	@HasMany(() => DocumentVersionModel, "documentId")
	versions?: DocumentVersionModel[];

	// @HasMany(() => DocumentCollaboratorModel, "documentId")
	// collaborators?: DocumentCollaboratorModel[];
}
