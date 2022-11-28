import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { BaseEntity } from "src/common/base";
import { Document } from "mongoose"
import { ValidRoles } from "../interface";

export type UserAuthDocument = UserAuth & Document

@Schema({ timestamps: true })
export class UserAuth extends BaseEntity {
  @ApiProperty({ type: String, description: 'User email', uniqueItems: true })
  @Prop({
		type: String,
		required: true,
	})
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 6,
    maxLength: 50,
    pattern: '/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
  })
  @Prop({
		type: String,
		required: true,
		select: false,
	})
  password: string;

  @ApiProperty({
    type: String,
    description: 'User full name',
    minLength: 1,
  })
  @Prop({
		type: String,
		required: true,
	})
  fullName: string;

  @ApiProperty({
    type: Boolean,
    default: true
  })
  @Prop({
		type: Boolean,
		default: true,
	})
  isActive: boolean;

  @ApiProperty({
    enum: ValidRoles,
    isArray: true,
    default: ['user'],
  })
  @Prop({
		type: [String],
		default: ['user'],
	})
  roles: string[];
}


export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);

// before insert hook
UserAuthSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('email')) {
		user.email = user.email.toLowerCase().trim();
	}
	next();
});