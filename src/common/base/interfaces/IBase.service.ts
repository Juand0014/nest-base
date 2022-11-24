import { BaseEntity } from '../entities/base.entity';
import { IBaseInterface } from './IBase.interfaces';

export interface IBaseService<
  T extends BaseEntity,
  TCreateEntityDto,
  TUpdateEntityDto,
> extends IBaseInterface<T, TCreateEntityDto, TUpdateEntityDto> {}
