import { createInvalidDataError, InvalidDataError } from "../../errors/errors";
import { Document } from "../../entities/document.entity";
import { IDocumentRepository } from "../../repositories/IDocumentRepository";
// import { IVersionRepository } from "../../repositories/IVersionRepository";

export type CreateDocumentDTO = {
	title: string;
	content?: string;
	ownerId: string;
};

export interface CreateDocumentDependencies {
	documents: IDocumentRepository;
	// versions: IVersionRepository;
}

export async function CreateDocument(
	//  mook documentService
	{ documents }: CreateDocumentDependencies,
	// mock DocumentDto
	dto: CreateDocumentDTO
): Promise<InvalidDataError | Document> {
	if (dto.title.trim() === "") {
		dto.title = "new document";
	}
	if (!dto.ownerId) {
		return createInvalidDataError("OwnerId is required");
	}

	const created: Document = await documents.create({
		title: dto.title,
		content: dto.content ?? "",
		ownerId: dto.ownerId,
	});

	// crear versión inicial
	/* 	await versions.create({
		documentId: created.id,
		content: created.content ?? "",
		version: 1,
		createdBy: dto.ownerId,
	}); */

	return created;
}
