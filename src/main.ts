import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configSwagger, cors } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('/api')
  app.enableCors(cors);

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`App is running on: ${port}`);
}
bootstrap();
