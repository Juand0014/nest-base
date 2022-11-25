import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
	@IsString()
	@IsNotEmpty()
	brand: string;

	@IsString()
	@IsNotEmpty()
	model: string;

	@IsNumber()
	@IsNotEmpty()
	year: number;

	@IsString()
	@IsNotEmpty()
	plate: string;
}
