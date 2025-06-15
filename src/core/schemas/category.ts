import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type categorySchema =  HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ required: true })
  title: string; 

  @Prop({ required: true })
  prefix: string;
  
  @Prop({ required: true })
  img: string;
}
export const categorySchema = SchemaFactory.createForClass(Category);