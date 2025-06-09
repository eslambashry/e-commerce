import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/core/schemas/product';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class ProductService {

constructor(@InjectModel(Product.name) private productModel: Model<User>) {}


   async getProducts(){
       const products = await this.productModel.find();
        console.log(products);
    }   
}
