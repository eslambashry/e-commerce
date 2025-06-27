import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/core/schemas/cart';
import { AddToCartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {


    constructor(private _cartService: CartService) {}



    // Example method to demonstrate controller functionality
    @Get()
    getCarts() {
        return this._cartService.getCarts();
    }

    @Get('/:id')
    getCartById(id: string) {
        return this._cartService.getCartById(id);
    }

    @Post('add')
    addToCart(@Body() body: AddToCartDto) {
        return this._cartService.addToCart(body);
    }

    @Get('getByOwner/:ownerId')
    getCartByOwner(@Param('ownerId') ownerId: string) {     
        return this._cartService.getCartByOwner(ownerId);
    }

    @Delete('delete/:id')
    deleteCart(@Param('id') id: string) {
        return this._cartService.deleteCart(id);
    }

    @Put('update')
    updateCart(id: string, body: AddToCartDto) {
        return this._cartService.updateCart(id, body);
    }
}
