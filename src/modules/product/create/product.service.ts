import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Product, ProductDocument } from '../../../core/schemas/product';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<ProductDocument> {


        let titleExsist = createProductDto.title;

        const existingProduct = await this.productModel.findOne({ title: titleExsist });
        if (existingProduct) {
            throw new HttpException('Product with the same title already exists', HttpStatus.CONFLICT);            
        }


        // Convert the owner string to ObjectId
        const productData = {
            ...createProductDto,
            owner: new mongoose.Types.ObjectId(createProductDto.owner)
        };

        const createdProduct = new this.productModel(productData);
        return createdProduct.save();
    }

    // Alternative method if you want to validate the owner exists
    async createProductWithValidation(createProductDto: CreateProductDto): Promise<ProductDocument> {
        // You can add user validation here if needed
        const productData = {
            title: createProductDto.title,
            price: createProductDto.price,
            owner: new mongoose.Types.ObjectId(createProductDto.owner),
            img: createProductDto.img,
            cat_prefix: createProductDto.cat_prefix,
            max: createProductDto.max,
        };

        const createdProduct = new this.productModel(productData);
        return createdProduct.save();
    }

    // Method to get product with populated owner
    async findProductWithOwner(productId: string): Promise<ProductDocument> {
        return this.productModel
            .findById(productId)
            .populate('owner')
            .exec();
    }
}
