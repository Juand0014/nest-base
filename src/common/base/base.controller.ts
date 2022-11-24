import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { ApiResponseStatus } from 'src/config';
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
    @ApiResponseStatus()
    @ApiOperation({ description: 'Get all data', summary: 'Get all data' })
    findAll(): Promise<T[]> {
      const entities = this.service.findAll();
      return entities;
    }

    @Get(':id')
    @ApiResponseStatus()
    @ApiOperation({ description: 'Get data by Id', summary: 'get data by Id' })
    @ApiParam({
      name: 'id',
      description: 'The id of the entity to find',
      type: String,
    })
    get(@Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId): Promise<T> {
      const entity = this.service.get(id);
      return entity;
    }

    @Patch(':id')
    @ApiOperation({
      description: 'Update data by Id and body',
      summary: 'Update data by Id and body',
    })
    @ApiResponseStatus()
    @UsePipes(validationPipeCustom(updateDto))
    @ApiParam({
      name: 'id',
      description: 'The id of the record to update',
      type: String,
    })
    @ApiBody({ type: updateDto })
    async update(
      @Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId,
      @Body() updateEntityDto: TUpdateEntityDto,
    ): Promise<T> {
      const updatedEntity = this.service.update(id, updateEntityDto);
      return updatedEntity;
    }

    @Post()
    @UsePipes(validationPipeCustom(bodyDto))
    @ApiOperation({
      description: 'Create Data',
      summary: 'Create Data',
    })
    @ApiResponseStatus()
    @ApiBody({ type: bodyDto })
    create(@Body() entity: TCreateEntityDto): Promise<T> {
      const newEntity = this.service.create(entity);
      return newEntity;
    }

    @Delete(':id')
    @ApiParam({
      name: 'id',
      type: String,
      description: 'The id of the entity',
    })
    @ApiResponseStatus()
    @ApiOperation({
      description: 'Create data by Id',
      summary: 'Create data by Id',
    })
    async delete(@Param('id', ParseObjectIdPipe) id: Schema.Types.ObjectId) {
      await this.service.delete(id);
      return;
    }
  }
  return BaseController;
}
