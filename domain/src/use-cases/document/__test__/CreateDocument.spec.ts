import { describe, it, expect, vi, test } from "vitest";
import { CreateDocument } from "../CreateDocument";
import { mockDocumentRepository } from "../../../mocks/document-repository-mock";
import { mockVersionRepository } from "../../../mocks/version-repository-mock";
import { createInvalidDataError } from "src/errors/Errors";

describe("CreateDocument use-case", () => {
	test("fails if title is empty", async () => {
		const docs = mockDocumentRepository([]);
		const versions = mockVersionRepository([]);
		const res = await CreateDocument({ documents: docs, versions }, { title: "", ownerId: "u1" });
		expect(res).toEqual(createInvalidDataError("Title is required"));
	});

	test("creates document and initial version", async () => {
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

