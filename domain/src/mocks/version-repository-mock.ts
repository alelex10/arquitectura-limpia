// import { DocumentVersion } from "../entities/document-version.entity";
// import { IVersionRepository } from "../repositories/IVersionRepository";

// export type VersionRepositoryMock = IVersionRepository & {
// 	versions: DocumentVersion[];
// };

// export function mockVersionRepository(initial: DocumentVersion[] = []): VersionRepositoryMock {
// 	const versions = [...initial];
// 	return {
// 		versions,
// 		create: async (v) => {
// 			const id = Math.random().toString(36).slice(2, 10);
// 			const versionObj: DocumentVersion = {
// 				id,
// 				documentId: v.documentId ?? "",
// 				content: v.content ?? "",
// 				version: v.version ?? versions.filter((x) => x.documentId === v.documentId).length + 1,
// 				createdBy: v.createdBy ?? "",
// 				createdAt: new Date(),
// 			};
// 			versions.push(versionObj);
// 			return versionObj;
// 		},
// 		findByDocumentId: async (documentId: string) => {
// 			return versions.filter((v) => v.documentId === documentId);
// 		},
// 	} as VersionRepositoryMock;
// }

