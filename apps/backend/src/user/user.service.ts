import { Injectable } from '@nestjs/common';
import { RegisterUserDto, registerUserUseCase} from '../../../../domain/src/use-cases/user/register-user.use-case';
import { IUserRepository } from '../../../../domain/src/repositories/IUserRepository';
import { User } from '../../../../domain/src/entities/user.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService implements IUserRepository {

  constructor(private readonly prisma: PrismaService) {}
  async create(userDto: RegisterUserDto): Promise<User> {
    registerUserUseCase({ userRepository: this }, userDto);
    const user = await this.prisma.user.create({ data: userDto });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
}
