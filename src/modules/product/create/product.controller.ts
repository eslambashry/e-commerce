import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

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

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('owner/:owner')
    async getProductsByOwner(@Param('owner') owner: string) {
        return this.productService.findProductWithOwner(owner);
    }

    @Get('category/:cat_prefix')
    async getProductsByCategory(@Param('cat_prefix') cat_prefix: string) {
        return this.productService.findProductsByCategory(cat_prefix);
    }

    @Get('search/:title')
    async searchProducts(@Param('title') title: string) {
        return this.productService.findProductByTitle(title);
    }

}
