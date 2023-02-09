import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { IBaseService } from '.';
import { PaginationDto } from '../dto';
import { BaseEntity } from './entities/base.entity';

@Injectable()
export class BaseService<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto,
> implements IBaseService<T, TCreateEntityDto, TUpdateEntityDto>
{
  constructor(private readonly basemodule: Model<T>) {}

  async findAll(paginationDto: PaginationDto): Promise<T[]> {
    const { limit = 10, offset } = paginationDto;
    try {
      return this.basemodule.find()
      .sort({
        createdAt: 1
      })
      .select(['-__v', '-createdAt', '-updatedAt', "-update_by"])
      .limit(limit)
      .skip(offset)
      .exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(_id: Schema.Types.ObjectId): Promise<T> {
    const customer = await this.basemodule.findById({ _id })
    .select(['-__v', '-createdAt', '-updatedAt', "-update_by"])
    .exec();
    if (!customer)
      throw new NotFoundException(`Entity with id ${_id} not found`);
    return customer;
  }
  
  async update(
    _id: Schema.Types.ObjectId,
    updateEntityDto: TUpdateEntityDto,
  ): Promise<T> {
      const updatedEntity = await this.basemodule
        .findByIdAndUpdate(_id, updateEntityDto, {
          new: true,
        })
        .select(['-__v', '-createdAt', '-updatedAt', "-created_by"])
        .exec();

      if (!Boolean(updatedEntity)){
        throw new NotFoundException(`Entity with id ${_id} not found`);
      }

      return updatedEntity;
  }
  async create(entity: TCreateEntityDto): Promise<T> {
    try {
      const createdEntity = await this.basemodule.create(entity);
      return createdEntity;
    } catch (err) {
      this.handleExceptions(err);
    }
  }
  async delete(_id: Schema.Types.ObjectId) {
    const { deletedCount } = await this.basemodule.deleteOne({ _id });
    if (!deletedCount)
      throw new NotFoundException(`Entity with id ${_id} not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(
        `This property exist in database ${JSON.stringify(error.keyValue)}`,
      );
    throw new InternalServerErrorException(
      `Can't create property - Check server logs`,
    );
  }
}
