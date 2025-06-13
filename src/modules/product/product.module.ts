import { Module } from '@nestjs/common';
import { ProductController } from './create/product.controller';
import { ProductService } from './create/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/core/schemas/product';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
