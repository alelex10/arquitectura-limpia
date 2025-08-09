export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

/**
 * Entidad User (dominio)
 * id: number (requerido)
 */
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string; // hashed password
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
