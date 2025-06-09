
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";


@Schema({ timestamps: true, versionKey: false })
export class Product {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    description: string;

    @Prop({ required: true, unique: true })
    price: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    owner: User;

    @Prop({ required: true, unique: true })
    image: string;
    
    @Prop({ required: true, unique: true })
    category: string;
    
    @Prop({ required: true, unique: true })
    quantity: number;
    
    @Prop()
    createdAt: Date;
    
    @Prop()
    updatedAt: Date;
}


export const productSchema = SchemaFactory.createForClass(Product);