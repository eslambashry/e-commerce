import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as winston from 'winston';
import { config } from 'dotenv';
import { resolve } from 'path';
import { winstonConfig } from 'config/logger.config';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  // Load environment variables first
  const envResult = config({ path: resolve('./config/.env') });
  
  if (envResult.error) {
    console.error('Error loading .env file:', envResult.error);
  } else {
    console.log('Successfully loaded .env file'); 
  }
  
  const logger = winston.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    }),
  );

  await app.init();
  
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// Only run the local server if not in Lambda environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  bootstrap().then(async (app) => {
    const expressApp = (await app).app;
    expressApp.listen(PORT, () => {
      console.log(`Server 🏃 running on port ${PORT}`);
    });
  });
}