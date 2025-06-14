import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';

@Controller('products')
// @UseGuards(AuthGuard)

export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return this.productService.findProductWithOwner(id);
    }
}
