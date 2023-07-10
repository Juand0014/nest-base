require('dotenv').config();
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import {
  database,
  envConfig,
  environment,
  JoiValidationSchema,
} from './config';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { BlacklistModule } from './modules/backlist/blacklist.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.name,
      ssl: environment === 'production',
      extra: {
        ssl: environment === 'production'
          ? { rejectUnauthorized: false }
          : null,
      }
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    CarModule,
    BlacklistModule,
  ]
  // imports: [
  //   ConfigModule.forRoot({
  //     load: [envConfig],
  //     validationSchema: JoiValidationSchema,
  //   }),
  //   MongooseModule.forRoot(database[environment]),
  //   ScheduleModule.forRoot(),
  //   CommonModule,
  //   AuthModule,
  //   CarModule,
  //   BlacklistModule,
  // ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
