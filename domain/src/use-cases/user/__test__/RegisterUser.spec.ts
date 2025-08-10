import { describe, test, expect, vi } from "vitest";
import {
  RegisterUser,
  RegisterUserDependencies,
  RegisterUserPayload,
} from "../RegisterUser";
import { createInvalidDataError } from "../../../errors/error";
import {
  mockUserRepository,
  UserRepositoryMock,
} from "src/mocks/UserRepositoryMock";

describe("RegisterUser use-case", () => {
  const userRepositoryMock: UserRepositoryMock = mockUserRepository([]);
  const deprendencies: RegisterUserDependencies = {
    userRepository: userRepositoryMock,
  };

  test("With an email already in use, fail with 'User already exists'", async () => {
    const payload: RegisterUserPayload = {
      username: "ale",
      email: "a@a.com",
      password: "123",
    };

    const result = RegisterUser(deprendencies, payload);

    expect(result).toEqual(createInvalidDataError("Email already in use"));
  });

  test("With an email is empty, fail with 'Email is required'", () => {
    const payload: RegisterUserPayload = {
      username: "ale",
      email: "",
      password: "123",
    };

    const result = RegisterUser(deprendencies, payload);

    expect(result).toEqual(createInvalidDataError("Email is required"));
  });

  test("With an username is empty, fail with 'Username is required'", () => {
    const payload: RegisterUserPayload = {
      username: "",
      email: "a@a.com",
      password: "123",
    };

    const result = RegisterUser(deprendencies, payload);

    expect(result).toEqual(createInvalidDataError("Username is required"));
  });

  test("With an password is empty, fail with 'Password is required'", () => {
    const payload: RegisterUserPayload = {
      username: "ale",
      email: "a@a.com",
      password: "",
    };

    const result = RegisterUser(deprendencies, payload);

    expect(result).toEqual(createInvalidDataError("Password is required"));
  });

  test("With valid data, register a new user", async () => {
    const payload: RegisterUserPayload = {
      username: "ale",
      email: "a@a.com",
      password: "123",
    };

    RegisterUser(deprendencies, payload);

    const result = await userRepositoryMock.findByEmail(payload.email);
    expect(result).not.toBeNull();
  });
});
