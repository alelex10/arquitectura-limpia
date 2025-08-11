export interface AppError {
	name: string;
	message: string;
	httpStatus?: number;
	details?: Record<string, unknown>;
}

export interface InvalidDataError extends AppError {
	name: "InvalidDataError";
	httpStatus: 400;
}

export interface NotFoundError extends AppError {
	name: "NotFoundError";
	httpStatus: 404;
}

export interface BadRequestError extends AppError {
	name: "BadRequestError";
	httpStatus: 400;
}

export interface UnauthorizedError extends AppError {
	name: "UnauthorizedError";
	httpStatus: 401;
}

export interface ForbiddenError extends AppError {
	name: "ForbiddenError";
	httpStatus: 403;
}

export interface ConflictError extends AppError {
	name: "ConflictError";
	httpStatus: 409;
}

export interface InternalServerError extends AppError {
	name: "InternalServerError";
	httpStatus: 500;
}

/** Factory functions (creators) */

/**
 * Crea un InvalidDataError (uso para validaciones de entrada en use-cases).
 * Ej: createInvalidDataError('Email already in use')
 */
export const createInvalidDataError = (
	message: string = "Invalid data provided.",
	details?: Record<string, unknown>
): InvalidDataError => ({
	name: "InvalidDataError",
	message,
	httpStatus: 400,
	details,
});

/** Recurso no encontrado */
export const createNotFoundError = (
	message: string = "Resource not found.",
	details?: Record<string, unknown>
): NotFoundError => ({
	name: "NotFoundError",
	message,
	httpStatus: 404,
	details,
});

/** Bad request genérico */
export const createBadRequestError = (
	message: string = "Bad request.",
	details?: Record<string, unknown>
): BadRequestError => ({
	name: "BadRequestError",
	message,
	httpStatus: 400,
	details,
});

/** No autenticado */
export const createUnauthorizedError = (
	message: string = "Unauthorized.",
	details?: Record<string, unknown>
): UnauthorizedError => ({
	name: "UnauthorizedError",
	message,
	httpStatus: 401,
	details,
});

/** Acceso prohibido */
export const createForbiddenError = (
	message: string = "Forbidden.",
	details?: Record<string, unknown>
): ForbiddenError => ({
	name: "ForbiddenError",
	message,
	httpStatus: 403,
	details,
});

/** Conflicto, p.ej. recurso ya existe */
export const createConflictError = (
	message: string = "Resource conflict.",
	details?: Record<string, unknown>
): ConflictError => ({
	name: "ConflictError",
	message,
	httpStatus: 409,
	details,
});

/** Error interno */
export const createInternalServerError = (
	message: string = "Internal server error.",
	details?: Record<string, unknown>
): InternalServerError => ({
	name: "InternalServerError",
	message,
	httpStatus: 500,
	details,
});

/** Error específico para credenciales inválidas (ej.: login) */
/** Lo devolvemos como BadRequest para mantener compatibilidad con la app; si prefieres, cambia a Unauthorized. */
export const createCredentialsError = (message = "Invalid credentials.", details?: Record<string, unknown>): AppError =>
	({
		...createBadRequestError(message, details),
		name: "CredentialsError",
	} as AppError);

/** Helpers / type guards opcionales */

/** Comprueba si el objeto es un AppError */
export const isAppError = (v: unknown): v is AppError => {
	return !!v && typeof v === "object" && "message" in v && "name" in v;
};

