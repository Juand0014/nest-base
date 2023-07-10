import { ApiProperty } from "@nestjs/swagger"
import { BaseEntity } from "src/common/base";
import { ValidRoles } from "../interface";
import { Column, Entity } from "typeorm";

export type UserAuthDocument = UserAuth & Document

@Entity('users')
export class UserAuth extends BaseEntity {
  @ApiProperty({ type: String, description: 'User email', uniqueItems: true })
  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 6,
    maxLength: 50,
    pattern: '/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
  })
  @Column()
  password: string;

  @ApiProperty({
    type: String,
    description: 'User full name',
    minLength: 1,
  })
  @Column()
  fullName: string;

  @ApiProperty({
    type: Boolean,
    default: true
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    enum: ValidRoles,
    isArray: true,
    default: ['user'],
  })
  @Column()
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