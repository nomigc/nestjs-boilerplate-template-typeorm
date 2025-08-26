import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infrastructure/postgres/typeorm.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './controllers/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { GroupsModule } from './controllers/groups-and-menus/groups/groups.module';
import { GroupMenusModule } from './controllers/groups-and-menus/groupmenus/group-menus.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger';
import { PracticeModule } from './controllers/practice/practice.module';
import { LocationModule } from './controllers/location/location.module';
import { AppointmentTypesModule } from './controllers/appointment-types/appointment-types.module';
import { AppointmentReasonModule } from './controllers/appointment-reason/appointment-reason.module';

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

  //* logger
  WinstonModule.forRoot(winstonConfig),

  //* others modules
  DataBaseModule,
  AuthModule,
  MailModule,
  GroupsModule,
  GroupMenusModule,
  PracticeModule,
  LocationModule,
  AppointmentTypesModule,
  AppointmentReasonModule,
];

export default GlobalImports;
