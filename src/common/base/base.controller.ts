import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiResponseStatus } from 'src/config';
import { BaseEntity, BaseService, IBaseController } from '.';
import { PaginationDto } from '../dto';
import { ParseObjectIdPipe } from '../pipes';
import { validationPipeCustom } from '../pipes/implemet-validationpipe.pipe';
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
      private readonly service: BaseService<
        T,
        TCreateEntityDto,
        TUpdateEntityDto
      >,
    ) {}

    @Get()
    @ApiResponseStatus()
    @ApiQuery({
      name: "offset",
      required: false,
      type: Number,
      description: "Page number",
      schema: {
        default: 1,
        minimum: 1,
      },
    })
    @ApiQuery({
      name: "limit",
      required: false,
      type: Number,
      description: "Limit number of entities returned",
      schema: {
        default: 10,
        minimum: 1,
        maximum: 100,
      },
    })
    @ApiOperation({ description: 'Get all data', summary: 'Get all data' })
    findAll(@Query() paginationDto: PaginationDto): Promise<T[]> {
      const entities = this.service.findAll(paginationDto);
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
    get(@Param('id', ParseUUIDPipe) id: string): Promise<T> {
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
    update(
      @Param('id', ParseUUIDPipe) id: string,
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
    async delete(@Param('id', ParseUUIDPipe) id: string) {
      await this.service.delete(id);
      return;
    }
  }
  return BaseController;
}