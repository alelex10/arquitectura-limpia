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
export declare const createInvalidDataError: (message?: string, details?: Record<string, unknown>) => InvalidDataError;
export declare const createNotFoundError: (message?: string, details?: Record<string, unknown>) => NotFoundError;
export declare const createBadRequestError: (message?: string, details?: Record<string, unknown>) => BadRequestError;
export declare const createUnauthorizedError: (message?: string, details?: Record<string, unknown>) => UnauthorizedError;
export declare const createForbiddenError: (message?: string, details?: Record<string, unknown>) => ForbiddenError;
export declare const createConflictError: (message?: string, details?: Record<string, unknown>) => ConflictError;
export declare const createInternalServerError: (message?: string, details?: Record<string, unknown>) => InternalServerError;
export declare const createCredentialsError: (message?: string, details?: Record<string, unknown>) => AppError;
export declare const isAppError: (v: unknown) => v is AppError;
//# sourceMappingURL=errors.d.ts.map