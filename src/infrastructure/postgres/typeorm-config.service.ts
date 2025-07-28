import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.appConfigService.dbHost,
      port: this.appConfigService.dbPort,
      username: this.appConfigService.dbUsername,
      password: this.appConfigService.dbPassword,
      database: this.appConfigService.dbName,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}
