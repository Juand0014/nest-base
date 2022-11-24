import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseEntitySchema } from './base/entities/base.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [MongooseModule.forFeature([{ name: 'Base', schema: BaseEntitySchema }])],
  exports: [MongooseModule]
})
export class CommonModule {}
