import { PaginationDto } from '../../dto';
import { BaseEntity } from '../entities/base.entity';

export interface IBaseInterface<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto,
> {
  findAll(paginationDto: PaginationDto): Promise<T[]>;

  get(id: string): Promise<T>;

  update(
    id: string,
    updateEntityDto: TUpdateEntityDto,
  ): Promise<T>;

  create(entity: TCreateEntityDto): Promise<T>;

  delete(id: string): Promise<void>;
}
