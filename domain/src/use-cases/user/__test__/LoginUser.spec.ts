import { describe, test, expect, beforeEach } from "vitest";
import { LoginUser, LoginUserDependencies, LoginUserPayload } from "../LoginUser";
import { createInvalidDataError } from "../../../errors/errors";
import { mockUserRepository, UserRepositoryMock } from "src/mocks/user-repository-mock";
import { User } from "../../../entities/user.entity";

describe("LoginUser use-case", () => {
	let userRepositoryMock: UserRepositoryMock;
	let dependencies: LoginUserDependencies;
	const user: User = {
		id: "1",
		username: "ale",
		email: "a@a.com",
		password: "correct",
		role: "USER",
	};

	beforeEach(() => {
		userRepositoryMock = mockUserRepository([user]);
		dependencies = { userRepository: userRepositoryMock };
	});

	test("With empty email, fail with 'Email is required'", async () => {
		const payload: LoginUserPayload = { email: "", password: "123" };
		const result = await LoginUser(dependencies, payload);
		expect(result).toEqual(createInvalidDataError("Email is required"));
	});

	test("With empty password, fail with 'Password is required'", async () => {
		const payload: LoginUserPayload = { email: "aa@a.com", password: "" };
		const result = await LoginUser(dependencies, payload);
		expect(result).toEqual(createInvalidDataError("Password is required"));
	});

	test("With non-existing email, fail with 'No user found for this email'", async () => {
		const payload: LoginUserPayload = { email: "no@no.com", password: "123" };
		const result = await LoginUser(dependencies, payload);
		expect(result).toEqual(createInvalidDataError("No user found for this email"));
	});

	test("With wrong password, fail with 'Password is incorrect'", async () => {
		const payload: LoginUserPayload = { email: "a@a.com", password: "wrong" };
		console.log(dependencies);
		const result = await LoginUser(dependencies, payload);

		expect(result).toEqual(createInvalidDataError("Password is incorrect"));
	});

	test("With valid credentials, return the user", async () => {
		const payload: LoginUserPayload = { email: "a@a.com", password: "correct" };
		const result = await LoginUser(dependencies, payload);
		expect(result).toEqual(user);
	});
});

