import {  Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../../core/schemas/cart';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {

    constructor(@InjectModel(Cart.name) private CartModel: Model<Cart>) {}

    // Example method to demonstrate service functionality
    async getCarts(): Promise<Cart[]> {
        const carts = await this.CartModel.find().populate('owner').exec();
        if (!carts) {
            throw new HttpException('No carts found',HttpStatus.NOT_FOUND);
        }
        return carts;
    }

    async getCartById(id: string): Promise<Cart> {
        const cart = await this.CartModel.findById(id).populate('owner').exec();
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    async addToCart(body: AddToCartDto){
        const newCart = new this.CartModel(body);
        return newCart.save();
    }



    async getCartByOwner(ownerId: string) {
        const carts = await this.CartModel.find({ owner: ownerId }).populate('owner').exec();
        if (!carts) {
            throw new Error('No carts found for this owner');
        }
        return carts;
    }


    

    // guard 
    async deleteCart(id: string) {
        const deletedCart = await this.CartModel.findByIdAndDelete(id);
        if (!deletedCart) {
            throw new Error('Cart not found');
        }
        return 'Cart deleted successfully';
    }

    async updateCart(id: string, @Body() body: AddToCartDto){
        const updatedCart = await this.CartModel.findByIdAndUpdate(id, body, { new: true }).populate('owner').exec();
        if (!updatedCart) {
            throw new Error('Cart not found');
        }
        return updatedCart;
    }
    
}
