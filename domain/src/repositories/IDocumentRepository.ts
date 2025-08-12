import { Document } from "../entities/Document";

export interface IDocumentRepository {
  findById(id: string): Promise<Document | null>;
  create(doc: Partial<Document>): Promise<Document>;
  update(doc: Document): Promise<Document>;
  // addCollaborator(collab: DocumentCollaborator): Promise<void>;
  delete(id: string): Promise<void>;
  findByOwnerId(ownerId: string): Promise<Document[]>;
}
