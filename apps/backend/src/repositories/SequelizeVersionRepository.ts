import { DocumentVersionModel } from "../database/models/DocumentVersion.model";


export class SequelizeVersionRepository {
  async create(payload: { documentId: string; content: string; version: number; createdBy: string }) {
    return DocumentVersionModel.create({
			documentId: payload.documentId,
			content: payload.content,
			version: payload.version,
			createdBy: payload.createdBy,
		});
  }

  async findByDocumentId(documentId: string) {
    return DocumentVersionModel.findAll({ where: { documentId }, order: [["version", "ASC"]] });
  }

  async findLatestByDocumentId(documentId: string) {
    return DocumentVersionModel.findOne({ where: { documentId }, order: [["version", "DESC"]] });
  }
}






