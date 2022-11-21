import {
  Controller,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { BaseEntity, IBaseController, IBaseService } from '.';
import { Constructor } from './types/constructor.types';

export function BaseControllerFactory<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto,
>(
  bodyDto: Constructor<TCreateEntityDto>,
  updateDto: Constructor<TUpdateEntityDto>,
): Constructor<IBaseController<T, TCreateEntityDto, TUpdateEntityDto>> {
  @Controller()
  class BaseController<T extends BaseEntity, TCreateEntityDto, TUpdateEntityDto>
    implements IBaseController<T, TCreateEntityDto, TUpdateEntityDto>
  {
    constructor(
      private readonly service: IBaseService<
        T,
        TCreateEntityDto,
        TUpdateEntityDto
      >,
    ) {}

    findAll(): Promise<T[]> {
      throw new Error('Method not implemented.');
    }

    get(_id: Schema.Types.ObjectId): Promise<T> {
      throw new Error('Method not implemented.');
    }

    update(_id: Schema.Types.ObjectId, updateEntityDto: TUpdateEntityDto): Promise<T> {
      throw new Error('Method not implemented.');
    }

    create(entity: TCreateEntityDto): Promise<T> {
      throw new Error('Method not implemented.');
    }

    delete(_id: Schema.Types.ObjectId) {
      throw new Error('Method not implemented.');
    }
    
  }
  return BaseController;
}
