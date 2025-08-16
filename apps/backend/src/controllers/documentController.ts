import { Router, Request, Response } from "express";
import { IDocumentRepository } from "@domain/repositories/IDocumentRepository";
import { IVersionRepository } from "@domain/repositories/IVersionRepository";
import { CreateDocument } from "@domain/use-cases/document/CreateDocument";
import { UpdateDocument } from "@domain/use-cases/document/UpdateDocument";
import { DeleteDocument } from "@domain/use-cases/document/DeleteDocument";
import { Document } from "@domain/entities/Document";
import { isAppError } from "@domain/errors/Errors";

/**
 * Helper para obtener userId desde req.user (si existe) o desde header x-user-id (dev)
 */
function getUserIdFromReq(req: Request): string | null {
	// @ts-ignore - si implementas middleware auth pondrás req.user
	const fromReqUser = (req as any).user?.id;
	if (typeof fromReqUser === "string" && fromReqUser.length > 0) return fromReqUser;
	const fromHeader = req.header("x-user-id");
	return fromHeader ?? null;
}

/**
 * Crea un Router con handlers que usan los use-cases del domain.
 * Inyectar repositorios concretos (InMemory o Prisma) al crear el router.
 */
export function createDocumentRouter(deps: { documents: IDocumentRepository; versions: IVersionRepository }) {
	const router = Router();

	// listar documentos del usuario (owner)
	router.get("/", async (req: Request, res: Response) => {
		const userId = getUserIdFromReq(req);
		if (!userId) return res.status(401).json({ message: "Missing user id" });

		try {
			const list = await deps.documents.findByOwnerId(userId);
			return res.json(list);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Server error" });
		}
	});

	// obtener documento por id
	router.get("/:id", async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const doc = await deps.documents.findById(id);
			if (!doc) return res.status(404).json({ message: "Document not found" });
			return res.json(doc);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Server error" });
		}
	});

	// crear documento
	router.post("/", async (req: Request, res: Response) => {
		const userId = getUserIdFromReq(req);
		if (!userId) return res.status(401).json({ message: "Missing user id" });

		const { title, content } = req.body;
		try {
			const result = await CreateDocument(
				{ documents: deps.documents, versions: deps.versions },
				{ title, content, ownerId: userId }
			);

			if (isAppError(result)) {
				return res.status(result.httpStatus ?? 400).json(result);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Server error" });
		}
	});

	// actualizar documento
	router.put("/:id", async (req: Request, res: Response) => {
		const userId = getUserIdFromReq(req);
		if (!userId) return res.status(401).json({ message: "Missing user id" });

		const { id } = req.params;
		const { title, content } = req.body;

		try {
			const result = await UpdateDocument(
				{ documents: deps.documents, versions: deps.versions },
				{ documentId: id, userId, title, content }
			);

			if (isAppError(result)) {
				return res.status(result.httpStatus ?? 400).json(result);
			}

			return res.json(result);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Server error" });
		}
	});

	// eliminar documento
	router.delete("/:id", async (req: Request, res: Response) => {
		const userId = getUserIdFromReq(req);
		if (!userId) return res.status(401).json({ message: "Missing user id" });

		const { id } = req.params;

		try {
			const result = await DeleteDocument({ documents: deps.documents }, { documentId: id, userId });
			if (isAppError(result)) {
				return res.status(result.httpStatus ?? 400).json(result);
			}
			return res.status(204).send();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Server error" });
		}
	});

	return router;
}

