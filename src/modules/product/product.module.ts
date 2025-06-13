import { Module } from '@nestjs/common';
import { ProductController } from './create/product.controller';
import { ProductService } from './create/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/core/schemas/product';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService,JwtService]
})
export class ProductModule {}
