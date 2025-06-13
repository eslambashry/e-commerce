import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as winston from 'winston';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';
// import { winstonConfig } from 'config/logger.config';

async function bootstrap() {
  // Load environment variables first
  const envResult = config({ path: resolve('./config/.env') });
  
  // Debug the env loading
  if (envResult.error) {
    console.error('Error loading .env file:', envResult.error);
  } else {
    console.log('Successfully loaded .env file'); 
  }
    
  // const logger = winston.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(
    morgan('dev', {
      stream: {
        write: (message) => console.log(message)
         //logger.info(message.trim()),
      },
    }),
  );

  const PORT = process.env.PORT;
  
  await app.listen(PORT);
  // logger.info(`Server 🏃 running on port ${PORT}`);
}

bootstrap();
  