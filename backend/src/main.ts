import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeFirebase } from './firebase.config';
import * as dotenv from 'dotenv';

dotenv.config();
initializeFirebase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
