import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import { DocumentVersionModel } from "./DocumentVersion.model";
// import { DocumentCollaboratorModel } from "./DocumentCollaborator.model";
import { UserModel } from "./User.model";

@Table({
  tableName: "documents",
  timestamps: true,
})
export class DocumentModel extends Model<DocumentModel> {
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
