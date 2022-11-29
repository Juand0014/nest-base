import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthSchema } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BlacklistModule } from 'src/modules/backlist/blacklist.module';
import { BlacklistService } from '../modules/backlist/blacklist.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserAuth', schema: UserAuthSchema }]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    // import blacklistModule to use it in the jwt.strategy
    forwardRef(() => BlacklistModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [MongooseModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
