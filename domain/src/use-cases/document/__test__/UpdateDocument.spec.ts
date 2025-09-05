import { describe, it, expect } from "vitest";
import { UpdateDocument } from "../update-document.use-case";
import { mockDocumentRepository } from "../../../mocks/document-repository-mock";
import { createInvalidDataError } from "../../../errors/errors";
import { mockVersionRepository } from "../../../mocks/version-repository-mock";

describe("UpdateDocument use-case", () => {
  it("fails if document not found", async () => {
    const docs = mockDocumentRepository([]);
    const versions = mockVersionRepository([]);
    const res = await UpdateDocument(
      { documents: docs, versions },
      { documentId: "x", userId: "u1", content: "new" }
    );
    expect(res).toEqual(createInvalidDataError("Document not found"));
  });

  it("fails if user not authorized", async () => {
    const docs = mockDocumentRepository([
      {
        id: "d1",
        title: "T",
        content: "c",
        ownerId: "u2",
        collaborators: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const versions = mockVersionRepository([]);
    const res = await UpdateDocument(
      { documents: docs, versions },
      { documentId: "d1", userId: "u1", content: "new" }
    );
    expect(res).toEqual(
      createInvalidDataError("Not authorized to update document")
    );
  });

  it("updates and creates new version when content changed", async () => {
    const docs = mockDocumentRepository([
      {
        id: "d1",
        title: "T",
        content: "old",
        ownerId: "u1",
        collaborators: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const versions = mockVersionRepository([
      {
        id: "v1",
        documentId: "d1",
        content: "old",
        version: 1,
        createdBy: "u1",
        createdAt: new Date(),
      },
    ]);
    const res = await UpdateDocument(
      { documents: docs, versions },
      { documentId: "d1", userId: "u1", content: "new" }
    );
    if ("message" in res) throw new Error("Unexpected error");
    expect(res.content).toBe("new");
    const v = await versions.findByDocumentId("d1");
    expect(v.length).toBe(2);
    expect(v[1].version).toBe(2);
  });
});
