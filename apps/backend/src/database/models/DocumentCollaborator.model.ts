import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  Index
} from "sequelize-typescript";
import { DocumentModel } from "./Document.model";
import { UserModel } from "./User.model";

export enum CollaboratorPermission {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  READER = "READER"
}

@Table({
  tableName: "document_collaborators",
  timestamps: true,
})
export class DocumentCollaboratorModel extends Model<DocumentCollaboratorModel> {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;


  @ForeignKey(() => DocumentModel)
  @Index("idx_document_collab_document")
  @Column({ type: DataType.UUID, allowNull: false })
  documentId!: string;

  @ForeignKey(() => UserModel)
  @Index("idx_document_collab_user")
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.ENUM(...Object.values(CollaboratorPermission)), allowNull: false })
  permission!: CollaboratorPermission;

  @BelongsTo(() => DocumentModel, "documentId")
  document?: DocumentModel;

  @BelongsTo(() => UserModel, "userId")
  user?: UserModel;
}
