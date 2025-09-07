"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserUseCase = registerUserUseCase;
const errors_1 = require("../../errors/errors");
async function registerUserUseCase({ userRepository }, { email, name: username, password }) {
    const hasError = validateData(email, username, password);
    if (hasError) {
        return hasError;
    }
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        return (0, errors_1.createInvalidDataError)("Email already in use");
    }
    const user = {
        id: crypto.randomUUID(),
        name: username,
        email,
        password,
        Role: "USER",
    };
    await userRepository.create(user);
}
function validateData(email, username, password) {
    if (!email || email.trim() === "") {
        return (0, errors_1.createInvalidDataError)("Email is required");
    }
    if (!username || username.trim() === "") {
        return (0, errors_1.createInvalidDataError)("Username is required");
    }
    if (!password || password.trim() === "") {
        return (0, errors_1.createInvalidDataError)("Password is required");
    }
}
//# sourceMappingURL=register-user.use-case.js.map