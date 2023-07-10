import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blacklist")
export class BlackList {
  @ApiProperty({ type: String, format: 'uuid' , description: 'id' })
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  token: string;
}
