import { NestFactory } from '@nestjs/core';
import  morgan from 'morgan';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { winstonConfig } from '../config/logger.config';

import winston from 'winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Load environment variables first
  const envResult = config({ path: resolve('./config/.env') });
  
  // Debug the env loading
  if (envResult.error) {
    console.error('Error loading .env file:', envResult.error);
  } else {
    console.log('Successfully loaded .env file'); 
  }
    
  const logger = winston.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // --- خيارات موصى بها بشدة للأمان والتنظيم ---

      // (أ) يزيل أي خصائص في الطلب لا يوجد لها مقابل في الـ DTO
      // هذا يحمي من إدخال بيانات غير متوقعة.
      whitelist: true,

      // (ب) يرمي خطأ إذا وجد خصائص غير مسموح بها (يعمل مع whitelist)
      forbidNonWhitelisted: true,

      // (ج) يقوم بتحويل أنواع البيانات تلقائياً (مثلاً، من نص إلى رقم)
      // هذا يغنيك عن استخدام @Type() في كثير من الحالات.
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  app.use(
    morgan('dev', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }),
  );

  const PORT = process.env.PORT;
  
  await app.listen(PORT);
  logger.info(`Server 🏃 running on port ${PORT}`);
}

bootstrap();
  