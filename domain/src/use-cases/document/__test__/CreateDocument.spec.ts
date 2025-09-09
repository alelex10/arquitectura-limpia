import { describe, it, expect, vi, test, beforeEach } from "vitest";
import { CreateDocument, CreateDocumentDependencies, CreateDocumentDTO } from "../create-document.use-case";
import { DocumentRepositoryMock, mockDocumentRepository } from "../../../mocks/document-repository-mock";
import { mockVersionRepository } from "../../../mocks/version-repository-mock";
import { createInvalidDataError } from "../../../errors/errors";
import { Document } from "../../../entities/document.entity";
import { a, b } from "vitest/dist/chunks/suite.d.FvehnV49";

describe("CreateDocument use-case", () => {
	let documentRepositoryMock: DocumentRepositoryMock;
	let dependencies: CreateDocumentDependencies;
	/* 	const documentExample: Document = {
		id: "1",
		title: "title",
		content: "content",
		ownerId: "ownerId",
	}; */

	beforeEach(() => {
		documentRepositoryMock = mockDocumentRepository([]);
		dependencies = { documents: documentRepositoryMock };
	});

	it("When document is valid, return document", async () => {
		const document: CreateDocumentDTO = {
			title: "title",
			content: "content",
			ownerId: "ownerId",
		};
		const resCreate = await CreateDocument(dependencies, document);
		console.log("resCreate", resCreate);
		if ("id" in resCreate) {
			const res = await documentRepositoryMock.findByOwnerId(resCreate.ownerId);
			
			expect(res).toEqual({
				id: expect.any(String),
				...document,
				updatedAt: expect.any(Date),
				createdAt: expect.any(Date),
			});
		}
		expect(resCreate).toEqual({
			id: expect.any(String),
			...document,
			updatedAt: expect.any(Date),
			createdAt: expect.any(Date),
		});
	});

	it("When ownerId is empty, return error 'OwnerId is required'", async () => {
		const document: CreateDocumentDTO = {
			title: "title",
			content: "content",
			ownerId: "",
		};
		const res = await CreateDocument(dependencies, document);
		expect(res).toEqual(createInvalidDataError("OwnerId is required"));
	});

	it("When content is empty, create document", async () => {
		const document: CreateDocumentDTO = {
			title: "title",
			content: "",
			ownerId: "ownerId",
		};
		const res = await CreateDocument(dependencies, document);
		expect(res).toEqual({
			id: expect.any(String),
			...document,
			updatedAt: expect.any(Date),
			createdAt: expect.any(Date),
		});
	});
	//should create multiple documents for the same user
	/* it("When create multitple documents for the same user, create document", async () => {
		await CreateDocument(dependencies, {
			title: "document 1",
			content: "",
			ownerId: "ownerId",
		})
		await CreateDocument(dependencies, {
			title: "document 2",
			content: "",
			ownerId: "ownerId",
		})

		const docs = await documentRepositoryMock.findByOwnerId("ownerId")
		console.log("docs", docs);
		expect(docs).toHaveLength(2);
	}); */

	test("When title is empty, set default title to 'new document'", async () => {
		let document: CreateDocumentDTO = {
			title: "",
			content: "content",
			ownerId: "ownerId",
		};
		const res = await CreateDocument({ documents: documentRepositoryMock }, document);
		expect(res).toEqual({
			id: expect.any(String),
			...document,
			title: "new document",
			updatedAt: expect.any(Date),
			createdAt: expect.any(Date),
		});
	});

	/* 	test("creates document and initial version", async () => {
		const docs = mockDocumentRepository([]);
		const versions = mockVersionRepository([]);
		const res = await CreateDocument({ documents: docs }, { title: "Doc", content: "c", ownerId: "u1" });
		if ("message" in res) throw new Error("Unexpected error");
		expect(res.title).toBe("Doc");
		const v = await versions.findByDocumentId(res.id);
		expect(v.length).toBe(1);
		expect(v[0].version).toBe(1);
	}); */
});
