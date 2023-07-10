import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarService extends BaseService<Car, CreateCarDto, UpdateCarDto> {

  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ){
    super(carRepository);
  }
}
