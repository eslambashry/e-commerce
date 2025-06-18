import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
 import mongoose , { Document }  from "mongoose";
import { User } from "./user.schema";
import { Category } from "./category";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
    @Prop({ required: true })  // Remove unique: true - titles can be similar
    title: string;

    @Prop({ required: true })  // Remove unique: true - prices can be the same
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    owner: mongoose.Types.ObjectId | User;  // Can be ObjectId or populated User

    @Prop({ required: true })  // Remove unique: true - images can be reused
    img: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
    cat_prefix: mongoose.Types.ObjectId | Category;  // Can be ObjectId or populated User
    
    @Prop({ required: true })  // Remove unique: true - max values can be the same
    max: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
