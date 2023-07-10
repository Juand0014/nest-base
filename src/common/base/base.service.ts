import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IBaseService } from '.';
import { PaginationDto } from '../dto';
import { BaseEntity } from './entities/base.entity';
import { DeepPartial, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export abstract class BaseService<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto,
> implements IBaseService<T, TCreateEntityDto, TUpdateEntityDto>
{
  constructor(private repository: Repository<T>) {}

  findAll(paginationDto: PaginationDto): Promise<T[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.repository.find({
      skip: offset,
      take: limit,
    });
  }

  async get(id: string): Promise<T> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const entity = await this.repository.findOne({
      where: { id } as any
    });
    if (!entity) {
      throw new NotFoundException(`Entity with ID '${id}' not found`);
    }
    return entity;
  }

  async update(id: string, updateEntityDto: TUpdateEntityDto): Promise<T> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    let entity = await this.get(id);
    entity = Object.assign({ id: entity.id, ...updateEntityDto });
    try {
      return await this.repository.save(entity);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async create(entityDto: TCreateEntityDto): Promise<T> {
    try {
      let entityParse = Object(entityDto)
      let entity = this.repository.create(entityParse);
      await this.repository.save(entity);
      return entityParse;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID '${id}' not found`);
    }
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
