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
import { DocumentModel } from "./Document.model";
import { UserModel } from "./User.model";

@Table({
  tableName: "document_versions",
  timestamps: true,
})
export class DocumentVersionModel extends Model<DocumentVersionModel> {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;


  @ForeignKey(() => DocumentModel)
  documentId!: string;

  @BelongsTo(() => DocumentModel, "documentId")
  document?: DocumentModel;

  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  version!: number;

  @ForeignKey(() => UserModel)
  createdBy!: string;

  @BelongsTo(() => UserModel, "createdBy")
  author?: UserModel;
}
