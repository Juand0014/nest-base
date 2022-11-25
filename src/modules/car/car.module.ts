import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CommonModule } from '../../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './entities/car.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [ 
    MongooseModule.forFeature([{name: 'Car', schema: CarSchema}]), 
    CommonModule,
    AuthModule
  ]
})
export class CarModule {}
