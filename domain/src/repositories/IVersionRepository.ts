import { DocumentVersion } from "../entities/DocumentVersion";

export interface IVersionRepository {
  create(version: Partial<DocumentVersion>): Promise<DocumentVersion>;
  findByDocumentId(documentId: string): Promise<DocumentVersion[]>;
  findLatestByDocumentId(documentId: string): Promise<DocumentVersion | null>;
}
