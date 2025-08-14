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
import { Document } from "./Document";
import { User } from "./User";

@Table({
  tableName: "document_versions",
  timestamps: true,
})
export class DocumentVersion extends Model<DocumentVersion> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @ForeignKey(() => Document)
  @Column({ type: DataType.UUID, allowNull: false })
  documentId!: string;

  @BelongsTo(() => Document, "documentId")
  document?: Document;

  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  version!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  createdBy!: string;

  @BelongsTo(() => User, "createdBy")
  author?: User;
}
