import { Controller, Get } from '@nestjs/common';
import { BaseControllerFactory } from 'src/common/base';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
