import { RegisterUserDto } from "../use-cases/user/register-user.use-case";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  create(user: RegisterUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  remove(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
