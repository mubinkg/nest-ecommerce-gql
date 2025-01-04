import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import * as path from 'path'
const admin = require('firebase-admin');

const serviceAccount =  path.join(__dirname, '../../serviceAccountKey.json')

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug','log'],
  });
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  app.use(graphqlUploadExpress({maxFileSize:1000*1000*1000, maxFiles: 5}))
  await app.listen(3001);
  console.log('App started on http://localhost:3001/graphql')
}
bootstrap();
