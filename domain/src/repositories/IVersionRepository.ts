import { DocumentVersion } from "@domain/entities/document-version.entity";

export interface IVersionRepository {
  create(version: Partial<DocumentVersion>): Promise<DocumentVersion>;
  findByDocumentId(documentId: string): Promise<DocumentVersion[]>;
  findLatestByDocumentId(documentId: string): Promise<DocumentVersion | null>;
}
