import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infrastructure/postgres/typeorm.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './controllers/auth/auth.module';
import { MailModule } from './mail/mail.module';

const GlobalImports: any = [
  //* env global configuration
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    cache: true,
  }),

  //* throttling implementation
  ThrottlerModule.forRoot([
    {
      name: 'globalThrottler',
      ttl: minutes(1),
      limit: 20,
    },
  ]),

  //* others modules
  DataBaseModule,
  AuthModule,
  MailModule,
];

export default GlobalImports;
