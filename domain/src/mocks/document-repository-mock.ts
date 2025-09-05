import { Document } from "../entities/document.entity";
import { IDocumentRepository } from "../repositories/IDocumentRepository";

/** Mock del repo de documentos */
export type DocumentRepositoryMock = IDocumentRepository & {
	docs: Document[];
};

export function mockDocumentRepository(docs: Document[] = []): DocumentRepositoryMock {
	return {
		docs: [...docs],
		create: async (doc) => {
			const id = crypto.randomUUID();
			const docObj: Document = {
				id,
				title: doc.title ?? "",
				content: doc.content ?? "",
				ownerId: doc.ownerId ?? "",
				collaborators: doc.collaborators ?? [],
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			return docObj;
		},
		update: async (doc) => {
			const index = docs.findIndex((x) => x.id === doc.id);
			if (index === -1) return null;
			docs[index] = doc;
			return doc;
		},
		delete: async (id) => {
			const index = docs.findIndex((x) => x.id === id);
			if (index === -1) return null;
			docs.splice(index, 1);
		},
		findById: async (id) => {
			const doc = docs.find((x) => x.id === id);
			if (!doc) return null;
			return doc;
		},
		findByOwnerId: async (ownerId) => {
			return docs.filter((x) => x.ownerId === ownerId);
		},
	};
}
