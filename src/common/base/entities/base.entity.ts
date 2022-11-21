import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MSchema } from "mongoose";

@Schema({ timestamps: true })
export class BaseEntity extends Document {
	_id: MSchema.Types.ObjectId;
	@Prop()
	created_on: Date;
	@Prop()
	updated_on: Date;
	@Prop()
	created_by: String;
	@Prop()
	update_by: String;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);