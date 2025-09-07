import { User } from "../entities/user.entity";
import { IUserRepository } from "../repositories/IUserRepository";

export interface UserRepositoryMock extends IUserRepository {
  users: User[];
}

export function mockUserRepository(users: User[]): UserRepositoryMock {
  return {
    users: [],
    findByEmail: async (email: string): Promise<User | null> => {
      const user = users.find((user) => user.email === email);
      const result = user ? { ...user } : null;
      return result;
    },
    create: async (user: User): Promise<User> => {
      users.push(user);
      return { ...user };
    },
    findAll: async (): Promise<User[]> => {
      return users.map((user) => ({ ...user }));
    },
    findOne: async (id: string): Promise<User | null> => {
      const user = users.find((user) => user.id === id);
      const result = user ? { ...user } : null;
      return result;
    },
    update: async (id: string, userData: Partial<User>): Promise<User> => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) throw new Error("User not found");
      users[index] = { ...users[index], ...userData };
      return { ...users[index] };
    },
    remove: async (id: string): Promise<void> => {
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) throw new Error("User not found");
      users.splice(index, 1);
    },
  };
}
