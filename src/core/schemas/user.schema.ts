import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { timestamp } from "rxjs";

export type userSchema = HydratedDocument<User>;

@Schema({timestamps : true, versionKey: false})

export class User {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;
    
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);