import { describe, it, expect, vi } from "vitest";
import { CreateDocument } from "../CreateDocument";
import { mockDocumentRepository, mockVersionRepository } from "../../mocks/document-repository-mock";
import { createInvalidDataError } from "../../errors/error";

describe("CreateDocument use-case", () => {
	it("fails if title is empty", async () => {
		const docs = mockDocumentRepository([]);
		const versions = mockVersionRepository([]);
		const res = await CreateDocument({ documents: docs, versions }, { title: "", ownerId: "u1" });
		expect(res).toEqual(createInvalidDataError("Title is required"));
	});

	it("creates document and initial version", async () => {
		const docs = mockDocumentRepository([]);
		const versions = mockVersionRepository([]);
		const res = await CreateDocument({ documents: docs, versions }, { title: "Doc", content: "c", ownerId: "u1" });
		if ("message" in res) throw new Error("Unexpected error");
		expect(res.title).toBe("Doc");
		const v = await versions.findByDocumentId(res.id);
		expect(v.length).toBe(1);
		expect(v[0].version).toBe(1);
	});
});
