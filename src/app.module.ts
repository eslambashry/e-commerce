import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';

@Module({

  imports: [
     ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    ProductModule,
    CategoryModule,
    AuthModule,
    UsersModule,
    CartModule,
    MongooseModule.forRoot(process.env.DB_URL),ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// TODO authGuard use next() to send useId