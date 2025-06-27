import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product';
import { User } from './user.schema';
 
export type CartDocument = Cart & Document;

class ProductItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongoose.Types.ObjectId | Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true, versionKey: false })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Types.ObjectId | User;

  @Prop({ type: [ProductItem], required: true })
  products: ProductItem[];

  @Prop({ required: true }) 
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
