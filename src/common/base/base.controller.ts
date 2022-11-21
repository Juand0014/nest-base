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
      const entities = this.service.findAll();
      return entities;
    }

    get(_id: Schema.Types.ObjectId): Promise<T> {
      const entity = this.service.get(_id);
      return entity;
    }

    update(_id: Schema.Types.ObjectId, updateEntityDto: TUpdateEntityDto): Promise<T> {
      const updatedEntity = this.service.update(_id, updateEntityDto);
      return updatedEntity;
    }

    create(entity: TCreateEntityDto): Promise<T> {
      const newEntity = this.service.create(entity);
      return newEntity;
    }

    delete(_id: Schema.Types.ObjectId) {
      this.service.delete(_id);
      return;
    }
    
  }
  return BaseController;
}
