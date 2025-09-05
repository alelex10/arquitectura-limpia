/**
 * Version de un documento
 */
export interface DocumentVersion {
  id: string;
  documentId: string;
  content: string;       // contenido Markdown
  version: number;       // número de versión incremental
  createdBy: string;     // user id
  createdAt?: Date;
}
