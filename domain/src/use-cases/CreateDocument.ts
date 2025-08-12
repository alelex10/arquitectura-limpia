import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { IVersionRepository } from "../repositories/IVersionRepository";
import { createInvalidDataError, InvalidDataError } from "../errors/error";
import { Document } from "../entities/Document";

export type CreateDocumentDTO = { title: string; content?: string; ownerId: string; };

export interface CreateDocumentDeps {
  documents: IDocumentRepository;
  versions: IVersionRepository;
}

export async function CreateDocument(
  { documents, versions }: CreateDocumentDeps,
  dto: CreateDocumentDTO
): Promise<InvalidDataError | Document> {
  if (!dto.title || dto.title.trim() === "") {
    return createInvalidDataError("Title is required");
  }
  if (!dto.ownerId) {
    return createInvalidDataError("OwnerId is required");
  }

  const created = await documents.create({
    title: dto.title,
    content: dto.content ?? "",
    ownerId: dto.ownerId
  });

  // crear versión inicial
  await versions.create({
    documentId: created.id,
    content: created.content ?? "",
    version: 1,
    createdBy: dto.ownerId
  });

  return created;
}
