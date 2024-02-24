import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(graphqlUploadExpress({maxFileSize:1000*1000*1000, maxFiles: 5}))
  await app.listen(3000);
  console.log('App started on http://localhost:3000/graphql')
}
bootstrap();
