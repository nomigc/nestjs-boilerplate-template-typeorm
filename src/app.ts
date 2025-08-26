import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import responseValidation from './validation/exception-factory.validation';
import { corsConfig } from './lib';
import { AppConfigService } from './config/config.service';
import { AllExceptionsFilter } from './common/filters';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger';
import { createDocument } from './common/swagger/swagger';

export const createApp = async () => {
  const app = await NestFactory.create(AppModule, {
    //* logger
    logger: WinstonModule.createLogger(winstonConfig),
  });

  //* config vars
  const configService = app.get(AppConfigService);
  const API_VERSION = configService.apiVersion;
  const API_PREFIX = configService.apiPrefix;
  const PORT = configService.port;

  //* middlewares
  app.use(helmet());
  app.use(compression());
  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe(responseValidation));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //* set Global Prefix
  app.setGlobalPrefix(`/${API_PREFIX}/${API_VERSION}`);

  //* swagger
  createDocument(app);

  //* PORT initialize
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return app;
};
