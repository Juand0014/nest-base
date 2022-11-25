import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserAuth', schema: UserAuthSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    MongooseModule
  ]
})
export class AuthModule {}
