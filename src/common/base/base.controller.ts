import {
  Body,
  Controller, Delete, Get, Param, Patch, Post, UseFilters, UsePipes,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { BaseEntity, IBaseController, IBaseService } from '.';
import { ParseObjectIdPipe } from '../pipes';
import { validationPipeCustom } from '../pipes/implementsValidationPipe';
import { Constructor } from '../types/constructor.types';

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

    @Get()
    findAll(): Promise<T[]> {
      const entities = this.service.findAll();
      return entities;
    }

    @Get(':id')

    get(@Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId): Promise<T> {
      const entity = this.service.get(id);
      return entity;
    }

    @Patch(':id')
    @UsePipes(validationPipeCustom(updateDto))
    async update(
      @Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId, 
      @Body() updateEntityDto: TUpdateEntityDto
    ): Promise<T> {
      const updatedEntity = this.service.update(id, updateEntityDto);
      return updatedEntity;
    }

    @Post()
    @UsePipes(validationPipeCustom(bodyDto))
    create(@Body() entity: TCreateEntityDto): Promise<T> {
      const newEntity = this.service.create(entity);
      return newEntity;
    }

    @Delete(':id')
    async delete(@Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId) {
      await this.service.delete(id);
      return;
    }
    
  }
  return BaseController;
}
