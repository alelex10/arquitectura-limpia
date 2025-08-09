/**
 * Version de un documento
 */
export interface DocumentVersion {
  id: number;
  documentId: number;
  content: string;       // contenido Markdown
  version: number;       // número de versión incremental
  createdBy: number;     // user id
  createdAt?: Date;
}
