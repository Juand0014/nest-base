import { Module, forwardRef } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CommonModule } from '../../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './entities/car.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from '../backlist/blacklist.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [ 
    MongooseModule.forFeature([{name: 'Car', schema: CarSchema}]), 
    forwardRef(() => BlacklistModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CommonModule)
  ],
  exports: [
    MongooseModule
  ]
})
export class CarModule {}
