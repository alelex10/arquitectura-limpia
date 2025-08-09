/**
 * Session para persistir tokens o sesiones en DB
 * - token: string (random o jti/jwt id)
 * - expiresAt: fecha de expiración para validar sesión
 */
export interface Session {
  id: number;
  userId: number;
  token: string;
  userAgent?: string | null;
  ip?: string | null;
  createdAt?: Date;
  expiresAt?: Date;
}
