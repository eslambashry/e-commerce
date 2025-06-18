import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/core/schemas/cart';

@Controller('cart')
export class CartController {


    constructor(private _cartService: CartService) {}



    // Example method to demonstrate controller functionality
    getCarts() {
        return this._cartService.getCarts();
    }

    getCartById(id: string) {
        return this._cartService.getCartById(id);
    }

    addToCart(cartData: Partial<Cart>) {
        return this._cartService.addToCart(cartData);
    }

    getCartByOwner(ownerId: string) {
        return this._cartService.getCartByOwner(ownerId);
    }

    deleteCart(id: string) {
        return this._cartService.deleteCart(id);
    }

    updateCart(id: string, cartData: Partial<Cart>) {
        return this._cartService.updateCart(id, cartData);
    }
}
