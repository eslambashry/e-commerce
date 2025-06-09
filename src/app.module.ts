import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

@Module({

  imports: [ProductModule,AuthModule,UsersModule,MongooseModule.forRoot('mongodb://localhost:27017/nest-ecommerce')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
