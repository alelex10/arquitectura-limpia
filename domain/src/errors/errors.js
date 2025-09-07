"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppError = exports.createCredentialsError = exports.createInternalServerError = exports.createConflictError = exports.createForbiddenError = exports.createUnauthorizedError = exports.createBadRequestError = exports.createNotFoundError = exports.createInvalidDataError = void 0;
const createInvalidDataError = (message = "Invalid data provided.", details) => ({
    name: "InvalidDataError",
    message,
    httpStatus: 400,
    details,
});
exports.createInvalidDataError = createInvalidDataError;
const createNotFoundError = (message = "Resource not found.", details) => ({
    name: "NotFoundError",
    message,
    httpStatus: 404,
    details,
});
exports.createNotFoundError = createNotFoundError;
const createBadRequestError = (message = "Bad request.", details) => ({
    name: "BadRequestError",
    message,
    httpStatus: 400,
    details,
});
exports.createBadRequestError = createBadRequestError;
const createUnauthorizedError = (message = "Unauthorized.", details) => ({
    name: "UnauthorizedError",
    message,
    httpStatus: 401,
    details,
});
exports.createUnauthorizedError = createUnauthorizedError;
const createForbiddenError = (message = "Forbidden.", details) => ({
    name: "ForbiddenError",
    message,
    httpStatus: 403,
    details,
});
exports.createForbiddenError = createForbiddenError;
const createConflictError = (message = "Resource conflict.", details) => ({
    name: "ConflictError",
    message,
    httpStatus: 409,
    details,
});
exports.createConflictError = createConflictError;
const createInternalServerError = (message = "Internal server error.", details) => ({
    name: "InternalServerError",
    message,
    httpStatus: 500,
    details,
});
exports.createInternalServerError = createInternalServerError;
const createCredentialsError = (message = "Invalid credentials.", details) => ({
    ...(0, exports.createBadRequestError)(message, details),
    name: "CredentialsError",
});
exports.createCredentialsError = createCredentialsError;
const isAppError = (v) => {
    return !!v && typeof v === "object" && "message" in v && "name" in v;
};
exports.isAppError = isAppError;
//# sourceMappingURL=errors.js.map