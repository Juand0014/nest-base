import { Schema as MSchema } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BaseEntity } from '../entities/base.entity';

export interface IBaseInterface<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto
> {
  findAll(paginationDto: PaginationDto): Promise<T[]>;

  get(_id: MSchema.Types.ObjectId): Promise<T>;

  update(
    _id: MSchema.Types.ObjectId,
    updateEntityDto: TUpdateEntityDto,
  ): Promise<T>;

  create(entity: TCreateEntityDto): Promise<T>;

  delete(_id: MSchema.Types.ObjectId): Promise<void>;
}
