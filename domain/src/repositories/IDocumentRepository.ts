import { Document } from "../entities/Document";

export interface IDocumentRepository {
	findById(id: string): Promise<Document | null>;
	create(doc: Partial<Document>): Promise<Document >;
	update(doc: Document): Promise<Document | null>;
	// addCollaborator(collab: DocumentCollaborator): Promise<void>;
	delete(id: string): Promise<void | null>;
	findByOwnerId(ownerId: string): Promise<Document[] | null>;
}

