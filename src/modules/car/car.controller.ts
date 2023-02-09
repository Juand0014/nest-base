import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { BaseControllerFactory } from 'src/common/base';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { ValidRoles } from '../../auth/interface/valid-roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto';

@ApiTags('Car')
@Controller('car')
export class CarController extends BaseControllerFactory<Car, CreateCarDto, UpdateCarDto>(CreateCarDto, UpdateCarDto) {
  constructor(private readonly carService: CarService) {
    super(carService);
  }

  @Auth(ValidRoles.user)
  @ApiBearerAuth()
  @Get()
  override findAll(paginationDto: PaginationDto): Promise<Car[]> {
    return super.findAll(paginationDto);
  }
}