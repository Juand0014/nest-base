require('dotenv').config();
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import {
  database,
  envConfig,
  environment,
  JoiValidationSchema,
} from './config';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(database[environment]),
    CommonModule,
    AuthModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
