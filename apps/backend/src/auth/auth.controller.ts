import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from '@domain/use-cases/user/login-user.use-case';
import { RegisterUserDto } from '@domain/use-cases/user/register-user.use-case';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('/register')
  async create(@Body() RegisterUserDto: RegisterUserDto) {
    const result = await this.authService.registeUser({
      ...RegisterUserDto,
    });
    console.log('result Controller', result);
    return result;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
