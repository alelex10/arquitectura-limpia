import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  RegisterUserDto,
  registerUserUseCase,
} from '@domain/use-cases/user/register-user.use-case';
import { User } from '@domain/entities/user.entity';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { PrismaService } from '../prisma/prisma.service';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Injectable()
export class UserService implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // private prisma = new PrismaService();

  async registeUser(userDto: RegisterUserDto) {
    console.log('userDto', userDto);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    userDto.password = hash;

    const result = await registerUserUseCase({ userRepository: this }, userDto);
    // console.log('result', result);
    return result;
  }

  async create(userDto: RegisterUserDto): Promise<User> {
    const user: User = await this.prisma.user.create({ data: userDto });
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
