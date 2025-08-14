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
import { User } from "./User";
import { DocumentVersion } from "./DocumentVersion";
import { DocumentCollaborator } from "./DocumentCollaborator";

@Table({
  tableName: "documents",
  timestamps: true,
})
export class Document extends Model<Document> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  content?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  ownerId!: string;

  @BelongsTo(() => User, "ownerId")
  owner?: User;

  @HasMany(() => DocumentVersion, "documentId")
  versions?: DocumentVersion[];

  @HasMany(() => DocumentCollaborator, "documentId")
  collaborators?: DocumentCollaborator[];
}
