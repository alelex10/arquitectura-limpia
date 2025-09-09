import { describe, it, expect } from "vitest";
import { DeleteDocument } from "../delete-document.use-case";
import { createInvalidDataError } from "../../../errors/errors";
import { mockDocumentRepository } from "../../../mocks/document-repository-mock";

describe("DeleteDocument use-case", () => {
	// TODO eliminar
	it("funciona", async () => {
		expect(true).toBe(true);
	})
	// TODO modificar pero sin incluir vercionado y colaboradores
/* 	it("fails if not owner", async () => {
		const docs = mockDocumentRepository([
			{
				id: "d1",
				title: "T",
				content: "",
				ownerId: "u2",
				collaborators: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		const res = await DeleteDocument({ documents: docs }, { documentId: "d1", userId: "u1" });
		expect(res).toEqual(createInvalidDataError("Only owner can delete document"));
	}); */

/* 	it("deletes if owner", async () => {
		const docs = mockDocumentRepository([
			{
				id: "d1",
				title: "T",
				content: "",
				ownerId: "u1",
				collaborators: [],
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		const res = await DeleteDocument({ documents: docs }, { documentId: "d1", userId: "u1" });
		expect(res).toBeUndefined();
		const found = await docs.findById("d1");
		expect(found).toBeNull();
	}); */
});

