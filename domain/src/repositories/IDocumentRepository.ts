import { Document } from "../entities/document.entity";

export interface IDocumentRepository {
	findById(id: string): Promise<Document | null>;
	create(doc: Partial<Document>): Promise<Document>;
	update(doc: Document): Promise<Document | null>;
	delete(id: string): Promise<boolean | null>;
	findByOwnerId(ownerId: string): Promise<Document[] | null>;
}

