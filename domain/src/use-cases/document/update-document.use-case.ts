import { createInvalidDataError, InvalidDataError } from "../../errors/errors";
import { Document } from "../../entities/document.entity";
import { IDocumentRepository } from "../../repositories/IDocumentRepository";

export type UpdateDocumentDTO = {
	documentId: string;
	userId: string; // actor
	title?: string;
	content?: string;
};

export interface UpdateDocumentDeps {
	documents: IDocumentRepository;
}

export async function UpdateDocument(
	{ documents }: UpdateDocumentDeps,
	dto: UpdateDocumentDTO
): Promise<InvalidDataError | Document> {
	if (!dto.documentId) return createInvalidDataError("DocumentId is required");
	if (!dto.userId) return createInvalidDataError("UserId is required");

	const doc = await documents.findById(dto.documentId);
	if (!doc) return createInvalidDataError("Document not found");

	// permiso: owner o editor
	const isOwner = doc.ownerId === dto.userId;
/* 	const hasEditor = (doc.collaborators ?? []).some(
		(c) => c.userId == dto.userId && (c.permission === "EDITOR" || c.permission === "OWNER")
	); */

	if (!isOwner ) {
		return createInvalidDataError("Not authorized to update document");
	}

	const updated: Document = {
		...doc,
		title: dto.title ?? doc.title,
		content: dto.content ?? doc.content,
	};

	const result = await documents.update(updated);

	if (!result) {
		return createInvalidDataError("Document not found");
	}
	return result;
}

