import { O } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { User } from "../../entities";
import { createInvalidDataError } from "../../errors/error";

export type RegisterUserPayload = Pick<User, "username" | "email" | "password">;

export function RegisterUser({ email, username, password }: RegisterUserPayload) {
	if (!email || email.trim() === "") {
		return createInvalidDataError("Email is required");
	}
	if (!username || username.trim() === "") {
		return createInvalidDataError("Username is required");
	}
  if(!password || password.trim() === "") {
    return createInvalidDataError("Password is required");
  }
	return createInvalidDataError("Email already in use");
}

