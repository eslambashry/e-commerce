import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonConfig } from './config/logger.config';
import * as morgan from 'morgan';
import * as winston from 'winston';


async function bootstrap() {

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
  await app.listen(8080);
  
}
bootstrap();
