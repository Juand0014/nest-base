import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserAuth } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAuth.name)
    private readonly userModel: Model<UserAuth>,
  ) {}
  async create(createAuthDto: CreateUserDto) {
    return await this.userModel.create(createAuthDto);
    // return await this.userModel.create(createAuthDto);
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findOne(id: number) {
    return await this.userModel.findById(id);
  }

  async update(id: number, updateAuthDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateAuthDto);
  }

  async remove(id: number) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
