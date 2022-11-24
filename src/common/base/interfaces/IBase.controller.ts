import { BaseEntity } from '../entities/base.entity';
import { IBaseInterface } from '.';

export interface IBaseController<
	T extends BaseEntity,
	TCreateEntityDto,
	TUpdateEntityDto
> extends IBaseInterface<T, TCreateEntityDto, TUpdateEntityDto>{}
