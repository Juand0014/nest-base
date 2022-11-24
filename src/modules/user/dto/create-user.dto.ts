import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

	@ApiProperty({
		description: 'The name of the user',
		nullable: false,
		minLength: 1,
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@ApiProperty({
		description: 'The last name of the user',
		nullable: false,
		type: 'string',
		default: 'Matos',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({
		description: 'The ID of the user',
		nullable: false,
		type: 'string',
		default: '123456789',
		required: true,
		maxLength: 11,
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
	identification: string;

	@ApiProperty({
		description: 'The password of the user',
		nullable: false,
		type: 'string',
		default: '123456789',
		required: true,
		maxLength: 12,
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(12)
	phoneNumber: string;

	@ApiProperty({
		description: 'The password of the user',
		nullable: false,
		type: 'string',
		default: '123456789',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
