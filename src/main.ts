import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonConfig } from './config/logger.config';
import * as morgan from 'morgan';
import * as winston from 'winston';
import { config } from 'dotenv'
import { resolve } from 'path'; // <-- correct import here

async function bootstrap() {

  config({ path: resolve('./config/.env') }); // <-- corrected line

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
    const PORT = process.env.PORT || 8080; // fallback just in case
  console.log("PORT", PORT);
  
  await app.listen(PORT, () => {
    logger.info(`server 🏃 ${PORT}`); 

  })
  
}
bootstrap();
