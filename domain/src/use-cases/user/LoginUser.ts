import { User } from "../../entities";
import { createInvalidDataError, InvalidDataError } from "../../errors/errors";
import { IUserRepository } from "../../repositories/IUserRepository";

export type LoginUserPayload = Pick<User, "email" | "password">;

export interface LoginUserDependencies {
	userRepository: IUserRepository;
}

export async function LoginUser(
	{ userRepository }: LoginUserDependencies,
	{ email, password }: LoginUserPayload
): Promise<User | InvalidDataError> {
	const hasError = validateData(email, password);
	if (hasError) {
		return hasError;
	}
	const existingUser = await userRepository.findByEmail(email);
	console.log("dependencies", userRepository)
	if (!existingUser) {
		return createInvalidDataError("No user found for this email");
	} else if (existingUser.password !== password) {
		return createInvalidDataError("Password is incorrect");
	}

	return existingUser;
}

function validateData(email: string, password: string): InvalidDataError | void {
	if (email.trim() === "") {
		return createInvalidDataError("Email is required");
	}
	if (password.trim() === "") {
		return createInvalidDataError("Password is required");
	}
}


