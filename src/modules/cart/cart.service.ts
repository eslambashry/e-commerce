import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../../core/schemas/cart';

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private CartModel: Model<CartDocument>) {}

    // Example method to demonstrate service functionality
    async getCarts(): Promise<CartDocument[]> {
        const carts = await this.CartModel.find().populate('owner').exec();
        if (!carts) {
            throw new Error('No carts found');
        }
        return carts;
    }

    async getCartById(id: string): Promise<CartDocument> {
        const cart = await this.CartModel.findById(id).populate('owner').exec();
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    async addToCart(cartData: Partial<CartDocument>): Promise<CartDocument> {
        const newCart = new this.CartModel(cartData);
        return newCart.save();
    }



    async getCartByOwner(ownerId: string): Promise<CartDocument[]> {
        const carts = await this.CartModel.find({ owner: ownerId }).populate('owner').exec();
        if (!carts) {
            throw new Error('No carts found for this owner');
        }
        return carts;
    }


    

    // guard 
    async deleteCart(id: string): Promise<string> {
        const deletedCart = await this.CartModel.findByIdAndDelete(id);
        if (!deletedCart) {
            throw new Error('Cart not found');
        }
        return 'Cart deleted successfully';
    }

    async updateCart(id: string, cartData: Partial<CartDocument>): Promise<CartDocument> {
        const updatedCart = await this.CartModel.findByIdAndUpdate(id, cartData, { new: true }).populate('owner').exec();
        if (!updatedCart) {
            throw new Error('Cart not found');
        }
        return updatedCart;
    }
    
}
