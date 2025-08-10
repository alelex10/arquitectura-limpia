import { User } from "../../entities";
import { createInvalidDataError } from "../../errors/error";
import { IUserRepository } from "../../repositories/IUserRepository";

export type RegisterUserPayload = Pick<User, "username" | "email" | "password">;

export interface RegisterUserDependencies {
  userRepository: IUserRepository;
}
export function RegisterUser(
  { userRepository }: RegisterUserDependencies,
  { email, username, password }: RegisterUserPayload
) {
  if (!email || email.trim() === "") {
    return createInvalidDataError("Email is required");
  }
  if (!username || username.trim() === "") {
    return createInvalidDataError("Username is required");
  }
  if (!password || password.trim() === "") {
    return createInvalidDataError("Password is required");
  }
  
  return createInvalidDataError("Email already in use");
}
