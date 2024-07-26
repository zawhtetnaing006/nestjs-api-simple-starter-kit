import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ApiResponseInterceptor } from './api-response/api-response.interceptor';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLoggerService(),
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //to filter unwanted properties from payload
      transform: true, //to transform plain js objects from payload to object typed
    }),
  );
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Learning platform')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
