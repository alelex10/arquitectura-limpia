import { DocumentCollaborator } from "./document-collaborator-entity";
import { DocumentVersion } from "./document-version.entity";

/**
 * Entidad Document (apunte / nota)
 */
export interface Document {
  id: string;
  title: string;
  content?: string;                      // Markdown (puede ser null inicialmente)
  ownerId: string;                       // user id (propietario)
  collaborators?: DocumentCollaborator[]; // lista de colaboradores y sus permisos
  versions?: DocumentVersion[];          // historial de versiones (opcional en el dominio)
  createdAt?: Date;
  updatedAt?: Date;
}
