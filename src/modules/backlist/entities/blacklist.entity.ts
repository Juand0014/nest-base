import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MSchema } from 'mongoose';

export type BlackListDocument = BlackList & Document;

@Schema({
  timestamps: {
    createdAt: true,
  },
})
export class BlackList {
  _id: MSchema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  token: string;
}

export const BlackListSchema = SchemaFactory.createForClass(BlackList);