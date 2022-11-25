import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { BaseControllerFactory } from 'src/common/base';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { ValidRoles } from '../../auth/interface/valid-roles';

@Controller('car')
export class CarController extends BaseControllerFactory<Car, CreateCarDto, UpdateCarDto>(CreateCarDto, UpdateCarDto) {
  constructor(private readonly carService: CarService) {
    super(carService);
  }

  @Auth(ValidRoles.admin)
  @Get()
  override findAll(): Promise<Car[]> {
    return super.findAll();
  }
}
