import { DocumentModel } from "../database/models/Document.model";
// import { DocumentCollaborator  } from "../database/models/DocumentCollaborator.model";
import { DocumentVersionModel } from "../database/models/DocumentVersion.model";
import { IDocumentRepository } from "@domain/repositories/IDocumentRepository";
import { Document as DocumentEntity } from "@domain/entities";

/**
 * Repositorio idiomático para Document (Sequelize)
 * Métodos pensados para ser usados directamente desde controllers/services.
 */
export class SequelizeDocumentRepository implements IDocumentRepository {
	async findById(id: string) {
		return DocumentModel.findByPk(id, {
			include: [
				{
					model: DocumentVersionModel,
					as: "versions",
				},
			],
		});
	}

	async findByOwnerId(ownerId: string) {
		return DocumentModel.findAll({ where: { ownerId } });
	}

	async create(payload: { title: string; content?: string; ownerId: string }) {
		return DocumentModel.create({
			title: payload.title,
			content: payload.content ?? "",
			ownerId: payload.ownerId,
		});
	}

  async update(doc:DocumentEntity)  {
    return DocumentModel.update(
      {
        title: doc.title,
        content: doc.content,
        collaborators: doc.collaborators,
      },
      { where: { id: doc.id } }
    );
	}

	async delete(id: string) {
		const doc = await DocumentModel.findByPk(id);
		if (!doc) return null;
		await doc.destroy();
		return true;
	}

	/* 	async addCollaborator(documentId: string, userId: string, permission: string) {
		return DocCollabModel.create({ documentId, userId, permission });
	} */
}

