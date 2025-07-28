import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import GlobalImports from './app.imports';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigService } from './config/config.service';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

@Module({
  imports: GlobalImports,
  controllers: [],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
