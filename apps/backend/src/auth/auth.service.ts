import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  RegisterUserDto,
  registerUserUseCase,
} from '@domain/use-cases/user/register-user.use-case';
import { InvalidDataError } from '@domain/errors/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Email doesn't exist");
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      roles: user.Role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async registeUser(
    userDto: RegisterUserDto,
  ): Promise<  InvalidDataError | void | User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);
    userDto.password = hash;
    try {
      const result = await registerUserUseCase(
        { userRepository: this.usersService },
        userDto,
      );

      
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        throw new BadRequestException(error.message);
      }
    }
  }
}
