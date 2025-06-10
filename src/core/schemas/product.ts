
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema({ timestamps: true, versionKey: false })
export class Product {

    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true, unique: true })
    price: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owner: User;

    @Prop({ required: true, unique: true })
    img: string;
    
    @Prop({ required: true, unique: true })
    cat_prefix: string;
    
    @Prop({ required: true, unique: true })
    max: number;

}


export const productSchema = SchemaFactory.createForClass(Product);