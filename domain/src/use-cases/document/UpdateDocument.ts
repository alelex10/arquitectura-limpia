import { createInvalidDataError, InvalidDataError } from "../../errors/Errors";
import { Document } from "../../entities/Document";
import { IDocumentRepository } from "../../repositories/IDocumentRepository";
import { IVersionRepository } from "../../repositories/IVersionRepository";

export type UpdateDocumentDTO = {
	documentId: string;
	userId: string; // actor
	title?: string;
	content?: string;
};

export interface UpdateDocumentDeps {
	documents: IDocumentRepository;
	versions: IVersionRepository;
}

export async function UpdateDocument(
	{ documents, versions }: UpdateDocumentDeps,
	dto: UpdateDocumentDTO
): Promise<InvalidDataError | Document> {
	if (!dto.documentId) return createInvalidDataError("DocumentId is required");
	if (!dto.userId) return createInvalidDataError("UserId is required");

	const doc = await documents.findById(dto.documentId);
	if (!doc) return createInvalidDataError("Document not found");

	// permiso: owner o editor
	const isOwner = doc.ownerId === dto.userId;
	const hasEditor = (doc.collaborators ?? []).some(
		(c) => c.userId == dto.userId && (c.permission === "EDITOR" || c.permission === "OWNER")
	);

	if (!isOwner && !hasEditor) {
		return createInvalidDataError("Not authorized to update document");
	}

	const updated: Document = {
		...doc,
		title: dto.title ?? doc.title,
		content: dto.content ?? doc.content,
	};

	const result = await documents.update(updated);

	// si cambió contenido, crear nueva versión
	if (dto.content !== undefined && dto.content !== doc.content) {
		const existingVersions = await versions.findByDocumentId(doc.id);
		const nextVersion = (existingVersions?.length ?? 0) + 1;
		await versions.create({
			documentId: doc.id,
			content: dto.content,
			version: nextVersion,
			createdBy: dto.userId,
		});
	}

	if (!result) {
		return createInvalidDataError("Document not found");
	}
	return result;
}

