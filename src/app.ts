import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import responseValidation from './validation/exception-factory.validation';
import { corsConfig } from './lib';
import { AppConfigService } from './config/config.service';
import { AllExceptionsFilter } from './common/filters';
import * as session from 'express-session';

export const createApp = async () => {
  const app = await NestFactory.create(AppModule);

  //* config vars
  const configService = app.get(AppConfigService);
  const API_VERSION = configService.apiVersion;
  const API_PREFIX = configService.apiPrefix;
  const PORT = configService.port;

  //* sessions
  app.use(
    session({
      secret: configService.sessionSecret,
      resave: configService.sessionResave,
      saveUninitialized: configService.sessionSaveUninitialized,
      cookie: {
        secure: configService.envSessionSecure,
      },
    }),
  );

  //* middlewares
  app.use(helmet());
  app.use(compression());
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe(responseValidation));
  app.useGlobalFilters(new AllExceptionsFilter());

  //* set Global Prefix
  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);

  //* swagger
  const config = new DocumentBuilder()
    .setTitle('sapienit apis')
    .setDescription('Apis for sapienit')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //* PORT initialize
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return app;
};
