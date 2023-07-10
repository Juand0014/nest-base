import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class BaseEntity {

  @ApiProperty({ type: String, format: 'uuid' , description: 'id' })
	@PrimaryGeneratedColumn('uuid')
  id: String;

  @ApiProperty({
    description: 'The person who created the record',
    example: 'Juan Matos',
    default: 'Juan Matos',
  })
  @Column()
  created_by: string;

  @ApiProperty({
    description: 'The person who updated the record',
    example: 'Juan Matos',
    default: 'Juan Matos',
  })
  @Column()
  update_by: string;
}
