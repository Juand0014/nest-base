import { BaseEntity } from '../../../common/base/entities/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car extends BaseEntity {

	@ApiProperty({
		description: 'The car brand',
		example: 'Toyota',
		default: 'Toyota',
		type: String,
		required: true,
	})
	@Prop({
		required: true,
		type: String,
	})
	brand: string;

	@ApiProperty({
		description: 'The car model',
		example: 'Corolla',
		default: 'Corolla',
		type: String,
		required: true
	})
	@Prop({
		required: true,
		type: String,
	})

	model: string;

	@ApiProperty({
		description: 'The car year',
		example: 2022,
		default: 2022,
		type: Number,
		required: true,
	})
	@Prop({
		required: true,
		type: Number,
	})
	year: number;

	@ApiProperty({
		description: 'The car plate',
		example: 'ABC123',
		default: 'ABC123',
		type: String,
		required: true,
	})
	@Prop({
		required: true,
		type: String,
	})
	plate: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);