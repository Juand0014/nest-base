import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/base/entities/base.entity';

@Schema({ timestamps: true })
export class User extends BaseEntity {

	@ApiProperty({
		description: 'The name of the user',
		example: 'Juan',
		default: 'Juan',
	})
	@Prop({ required: true, unique: true, minLength: 3 })
	name: String

	@ApiProperty({
		description: "The last name of the user",
		example: "Matos",
		default: "Matos",
	})
	@Prop({ required: true })
	lastName: String

	@ApiProperty({
		description: "The phone number of the user",
		example: "829-555-5555",
		default: "829-555-5555",
		format: "phone"
	})
	@Prop({
		type: String,
		maxlength: 12,
	})
	phoneNumber?: String

	@ApiProperty({
		description: "The ID of the user",
		example: "123456789",
		default: "123456789",
	})
	@Prop({ required: true, unique: true, maxLength: 11 })
	identification: String

	@ApiProperty({
		description: "The password of the user",
		example: "123456789",
		type: "uuid"
	})
	@Prop({ required: true })
	password: string

}

export const UserSchema = SchemaFactory.createForClass(User);