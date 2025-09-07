import { User } from "../../entities/user.entity";
import { InvalidDataError } from "../../errors/errors";
import { IUserRepository } from "../../repositories/IUserRepository";
export type RegisterUserDto = Pick<User, "name" | "email" | "password">;
export interface RegisterUserDependencies {
    userRepository: IUserRepository;
}
export declare function registerUserUseCase({ userRepository }: RegisterUserDependencies, { email, name: username, password }: RegisterUserDto): Promise<InvalidDataError | void>;
//# sourceMappingURL=register-user.use-case.d.ts.map