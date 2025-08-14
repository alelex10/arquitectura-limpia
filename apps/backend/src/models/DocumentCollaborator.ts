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
import { User } from "./User";
import { Document } from "./Document";

export enum CollaboratorPermission {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  READER = "READER"
}

@Table({
  tableName: "document_collaborators",
  timestamps: true,
})
export class DocumentCollaborator extends Model<DocumentCollaborator> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @ForeignKey(() => Document)
  @Index("idx_document_collab_document")
  @Column({ type: DataType.UUID, allowNull: false })
  documentId!: string;

  @ForeignKey(() => User)
  @Index("idx_document_collab_user")
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.ENUM(...Object.values(CollaboratorPermission)), allowNull: false })
  permission!: CollaboratorPermission;

  @BelongsTo(() => Document, "documentId")
  document?: Document;

  @BelongsTo(() => User, "userId")
  user?: User;
}
