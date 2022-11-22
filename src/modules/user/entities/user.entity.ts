import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../../common/base/entities/base.entity';

@Schema({ timestamps: true })
export class User extends BaseEntity {

	@Prop({ required: true, unique: true, minLength: 3 })
	name: String

	@Prop({ required: true })
	lastName: String

	@Prop()
	phoneNumber?: String

	@Prop({ required: true, unique: true, maxLength: 11 })
	identification: String

	@Prop({ required: true })
	password: string

}

export const UserSchema = SchemaFactory.createForClass(User);