import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { AppConfigService } from '@/config/config.service';
import { AppConfigModule } from '@/config/config.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: TypeOrmConfigService,
      inject: [AppConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
