import { User } from "../entities";
import { IUserRepository } from "../repositories/IUserRepository";

export interface UserRepositoryMock extends IUserRepository {
	users: User[];
}

export function mockUserRepository(users: User[]): UserRepositoryMock {
	return {
		users: [],
		async findByEmail(email: string): Promise<User | null> {
            const user = users.find((user) => user.email === email);
            const result = user ? { ...user } : null;
			return result;
		},
	};
}

