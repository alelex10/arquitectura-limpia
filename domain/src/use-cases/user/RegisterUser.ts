import { User } from "../../entities";
import { createInvalidDataError, InvalidDataError } from "../../errors/Errors";
import { IUserRepository } from "../../repositories/IUserRepository";

export type RegisterUserPayload = Pick<User, "username" | "email" | "password">;

export interface RegisterUserDependencies {
	userRepository: IUserRepository;
}
export async function RegisterUser(
	{ userRepository }: RegisterUserDependencies,
	{ email, username, password }: RegisterUserPayload
): Promise<InvalidDataError | void> {
	const hasError = validateData(email, username, password);
	if (hasError) {
		return hasError;
	}

	const existingUser = await userRepository.findByEmail(email);

	if (existingUser) {
		return createInvalidDataError("Email already in use");
	}

	const user: User = {
		id: crypto.randomUUID() /* para generar ids unicos */,
		username,
		email,
		password,
		role: "USER",
	};

	await userRepository.save(user);
}

function validateData(email: string, username: string, password: string): InvalidDataError | void {
	if (!email || email.trim() === "") {
		return createInvalidDataError("Email is required");
	}
	if (!username || username.trim() === "") {
		return createInvalidDataError("Username is required");
	}
	if (!password || password.trim() === "") {
		return createInvalidDataError("Password is required");
	}
}
