import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule
  ]
})
export class UserModule {}
