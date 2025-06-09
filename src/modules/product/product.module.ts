import { Module } from '@nestjs/common';
import { ProductController } from './create/product.controller';
import { ProductService } from './create/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/core/schemas/product';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
