import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
	identification: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
