import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MSchema } from 'mongoose';

export class BaseEntity {
	
  _id: MSchema.Types.ObjectId;

  @ApiProperty({
    description: 'The person who created the record',
    example: 'Juan Matos',
    default: 'Juan Matos',
  })
  @Prop({
    type: String,
    default: 'Juan Matos',
  })
  created_by: String;

  @ApiProperty({
    description: 'The person who updated the record',
    example: 'Juan Matos',
    default: 'Juan Matos',
  })
  @Prop({
    type: String,
    default: 'Juan Perez',
  })
  update_by: String;
}
