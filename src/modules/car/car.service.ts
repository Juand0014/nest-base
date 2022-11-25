import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../common/base';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';

@Injectable()
export class CarService extends BaseService<Car, CreateCarDto, UpdateCarDto> {

  constructor(
    @InjectModel(Car.name)
    private carModel: Model<Car>,
  ){
    super(carModel);
  }
}
