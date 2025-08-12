import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { createInvalidDataError, InvalidDataError } from "../../errors/Errors";

export interface DeleteDocumentDeps {
  documents: IDocumentRepository;
}

export type DeleteDocumentDTO = {
  documentId: string;
  userId: string;
};

export async function DeleteDocument(
  { documents }: DeleteDocumentDeps,
  { documentId, userId }: DeleteDocumentDTO
): Promise<InvalidDataError | void> {
  if (!documentId) return createInvalidDataError("DocumentId is required");
  if (!userId) return createInvalidDataError("UserId is required");

  const doc = await documents.findById(documentId);
  if (!doc) return createInvalidDataError("Document not found");

  if (doc.ownerId !== userId) {
    return createInvalidDataError("Only owner can delete document");
  }

  await documents.delete(documentId);
}
