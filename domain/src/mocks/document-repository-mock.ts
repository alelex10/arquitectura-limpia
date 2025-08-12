import { Document, DocumentCollaborator } from "../entities/Document";
import { DocumentVersion } from "../entities/DocumentVersion";
import { IDocumentRepository } from "../repositories/IDocumentRepository";
import { IVersionRepository } from "../repositories/IVersionRepository";

/** Mock del repo de documentos */
export type DocumentRepositoryMock = IDocumentRepository & {
  docs: Document[];
};

export function mockDocumentRepository(initial: Document[] = []): DocumentRepositoryMock {
  const docs = [...initial];

  return {
    docs,
    findById: async (id: string) => {
      const d = docs.find(doc => doc.id === id);
      return d ? { ...d } : null;
    },
    create: async (docPartial) => {
      const id = Math.random().toString(36).slice(2, 10);
      const now = new Date();
      const doc: Document = {
        id,
        title: docPartial.title ?? "",
        content: docPartial.content ?? "",
        ownerId: docPartial.ownerId ?? "",
        collaborators: docPartial.collaborators ?? [],
        versions: docPartial.versions ?? [],
        createdAt: now,
        updatedAt: now
      };
      docs.push(doc);
      return { ...doc };
    },
    update: async (doc) => {
      const idx = docs.findIndex(d => d.id === doc.id);
      if (idx === -1) throw new Error("NOT_FOUND");
      docs[idx] = { ...docs[idx], ...doc, updatedAt: new Date() };
      return { ...docs[idx] };
    },
    addCollaborator: async (collab: DocumentCollaborator) => {
      const doc = docs.find(d => d.id === collab.documentId);
      if (!doc) throw new Error("NOT_FOUND");
      doc.collaborators = doc.collaborators ?? [];
      doc.collaborators.push(collab);
    },
    delete: async (id: string) => {
      const idx = docs.findIndex(d => d.id === id);
      if (idx === -1) throw new Error("NOT_FOUND");
      docs.splice(idx, 1);
    }
  } as DocumentRepositoryMock;
}

/** Mock del repo de versiones */
export type VersionRepositoryMock = IVersionRepository & {
  versions: DocumentVersion[];
};

export function mockVersionRepository(initial: DocumentVersion[] = []): VersionRepositoryMock {
  const versions = [...initial];
  return {
    versions,
    create: async (v) => {
      const id = Math.random().toString(36).slice(2, 10);
      const versionObj: DocumentVersion = {
        id,
        documentId: v.documentId ?? "",
        content: v.content ?? "",
        version: v.version ?? (versions.filter(x => x.documentId === v.documentId).length + 1),
        createdBy: v.createdBy ?? "",
        createdAt: new Date()
      };
      versions.push(versionObj);
      return versionObj;
    },
    findByDocumentId: async (documentId: string) => {
      return versions.filter(v => v.documentId === documentId);
    }
  } as VersionRepositoryMock;
}
