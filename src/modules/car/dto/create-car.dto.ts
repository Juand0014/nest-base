import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
	@ApiProperty({
		description: 'The name of the car',
		type: String,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	brand: string;

	@ApiProperty({
		description: 'The model of the car',
		type: String,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	model: string;

	@ApiProperty({
		description: 'The year of the car',
		type: Number,
		required: true
	})
	@IsNumber()
	@IsNotEmpty()
	year: number;

	@ApiProperty({
		description: 'The color of the car',
		type: String,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	plate: string;
}
