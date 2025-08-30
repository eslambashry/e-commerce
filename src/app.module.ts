import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. استيراد TypeOrmModule
import { ProjectsModule } from './modules/projects/projects.module';
import { ClientModule } from './modules/client/client.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ResearchesModule } from './modules/researches/researches.module';
 
@Module({

  imports: [
     ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // استيراد ConfigModule هنا لضمان توفر ConfigService
      inject: [ConfigService], // حقن ConfigService لاستخدامه
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // entities: [Project], // <-- سنضيف الـ Entities هنا لاحقاً
        autoLoadEntities: true,
        synchronize: true, // <-- هام: true للتطوير فقط، يجعل TypeORM ينشئ الجداول تلقائياً
      }),
    }),
    AuthModule,
    UsersModule,
    VendorsModule,
    ProjectsModule,  
    ResearchesModule,
    ClientModule,
    MongooseModule.forRoot(process.env.DB_URL),ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// TODO authGuard use next() to send useId