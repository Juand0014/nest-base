import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MSchema } from 'mongoose';

@Schema({ timestamps: true })
export class BaseEntity extends Document {
	
  _id: MSchema.Types.ObjectId;

  @ApiProperty({
    description: 'The date of creation of the record',
    example: '2021-05-01T00:00:00.000Z',
    default: '2021-05-01T00:00:00.000Z',
  })
  @Prop({
    type: Date,
    default: Date.now,
  })
  created_on: Date;

  @ApiProperty({
    description: 'The date of the last update of the record',
    example: '2021-05-01T00:00:00.000Z',
    default: '2021-05-01T00:00:00.000Z',
  })
  @Prop({
    type: Date,
    default: Date.now,
  })
  updated_on: Date;

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

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
