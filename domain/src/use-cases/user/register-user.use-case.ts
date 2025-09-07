import { User } from "../../entities/user.entity";
import { createInvalidDataError, InvalidDataError } from "../../errors/errors";
import { IUserRepository } from "../../repositories/IUserRepository";

export type RegisterUserDto = Pick<User, "name" | "email" | "password">;

export interface RegisterUserDependencies {
  userRepository: IUserRepository;
}
export async function registerUserUseCase(
  { userRepository }: RegisterUserDependencies,
  { email, name: username, password }: RegisterUserDto
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
    name: username,
    email,
    password,
    Role: "USER",
  };

  await userRepository.create(user);
}

function validateData(
  email: string,
  username: string | null,
  password: string
): InvalidDataError | void {
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
