import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('/api')
  await app.listen(3000);
  Logger.log(`App is running on: ${port}`, "Bootstrap");
}
bootstrap();
