import { BaseEntity } from '../entities/base.entity';
import { IBaseService } from './IBase.service';

export interface IBaseController<
	T extends BaseEntity,
	TCreateEntityDto,
	TUpdateEntityDto
> extends IBaseService<T, TCreateEntityDto, TUpdateEntityDto>{}
