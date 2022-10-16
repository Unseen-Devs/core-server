import './dotenv-config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './middlewares/HttpExceptionFilter';

const PORT = parseInt(process.env.PORT ?? '3000', 10);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? false : ['error', 'debug', 'warn'],
    cors: false,
    bodyParser: true,
  });

  app.use(cookieParser());
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
    immutable: true,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days
    etag: true,
    extensions: [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'svg',
      'mp4',
      'pdf',
      'doc',
      'docx',
      'xlsx',
      'xls',
      'ppt',
      'pptx',
      'webp',
      'zip',
    ],
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
  app.use(compression());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().finally(() => {
  //
});

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
