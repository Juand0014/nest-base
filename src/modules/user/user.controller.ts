import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseControllerFactory } from 'src/common/base';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags("User")
@Controller('users')
export class UserController extends BaseControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto
>(CreateUserDto, UpdateUserDto) {
  constructor(protected readonly service: UserService) {
    super(service);
  }
}
