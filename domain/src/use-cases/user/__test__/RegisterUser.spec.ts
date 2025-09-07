import { describe, test, expect, vi, beforeEach } from "vitest";
import { registerUserUseCase, RegisterUserDependencies, RegisterUserDto } from "../register-user.use-case";
import { createInvalidDataError } from "../../../errors/errors";
import { mockUserRepository, UserRepositoryMock } from "../../../../src/mocks/user-repository-mock";

describe("RegisterUser use-case", async () => {
	let userRepositoryMock: UserRepositoryMock;
	let dependencies: RegisterUserDependencies;

	beforeEach(() => {
		userRepositoryMock = mockUserRepository([]);
		dependencies = { userRepository: userRepositoryMock };
	});
	test("With an email already in use, fail with 'Email already in use'", async () => {
		const payload: RegisterUserDto = {
			name: "ale",
			email: "a@a.com",
			password: "123",
		};
		await registerUserUseCase(dependencies, payload);
		const result = await registerUserUseCase(dependencies, payload);

		expect(result).toEqual(createInvalidDataError("Email already in use"));
	});

	test("With an email is empty, fail with 'Email is required'", async () => {
		const payload: RegisterUserDto = {
			name: "ale",
			email: "",
			password: "123",
		};

		const result = await registerUserUseCase(dependencies, payload);

		expect(result).toEqual(createInvalidDataError("Email is required"));
	});

	test("With an username is empty, fail with 'Username is required'", async () => {
		const payload: RegisterUserDto = {
			name: "",
			email: "a@a.com",
			password: "123",
		};

		const result = await registerUserUseCase(dependencies, payload);

		expect(result).toEqual(createInvalidDataError("Username is required"));
	});

	test("With an password is empty, fail with 'Password is required'", async () => {
		const payload: RegisterUserDto = {
			name: "ale",
			email: "a@a.com",
			password: "",
		};

		const result = await registerUserUseCase(dependencies, payload);

		expect(result).toEqual(createInvalidDataError("Password is required"));
	});

	test("With valid data, register a new user", async () => {
		const payload: RegisterUserDto = {
			name: "ale",
			email: "aa@a.com",
			password: "123",
		};

		const result = await registerUserUseCase(dependencies, payload);

		// Verificamos que el resultado sea undefined (sin errores)
		expect(result).toBeUndefined();
		console.log("dependencies", dependencies);
		// Verificamos que el usuario fue creado
		const user = await userRepositoryMock.findByEmail(payload.email);
		expect(user).not.toBeNull();
	});
});
