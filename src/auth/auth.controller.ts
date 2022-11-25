import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { Auth } from './decorator/auth.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserAuth } from './entities/user.entity';
import { ValidRoles } from './interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  
  @Auth(ValidRoles.user)
  @Get('refreshToken')
  refreshToken(
    @GetUser() user: UserAuth
  ) {
    return this.authService.refreshToken(user);
  }

}
