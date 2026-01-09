import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLogger } from './common/logger/app.logger';
import { requestLogger } from './common/middlewares/logger.middleware';
import { access } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.use(requestLogger);
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix : '/uploads'
  })

  // app.useLogger(new AppLogger());

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter())
  // app.useGlobalGuards()
  app.useGlobalInterceptors(new ResponseInterceptor())

  

  app.setGlobalPrefix('api'); 

  const config = new DocumentBuilder()
    .setTitle('BookNest API')
    .setDescription('Online Book Store')
    .setVersion('1.0')
    .addBearerAuth({
      type : 'http',
      scheme : 'Bearer',
      bearerFormat : 'JWT',
      in : 'header'
    }, "access-token")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions : {
      persistAuthorization : true
    }
  });

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
