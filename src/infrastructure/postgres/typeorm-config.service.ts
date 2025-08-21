import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      // host: this.appConfigService.dbHost,
      // port: this.appConfigService.dbPort,
      // username: this.appConfigService.dbUsername,
      // password: this.appConfigService.dbPassword,
      // database: this.appConfigService.dbName,
      url: this.appConfigService.dbUri,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
      synchronize: this.appConfigService.envTypeormSynchronize,
      logging: this.appConfigService.envTypeormLogging,
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        options: '-c timezone=utc',
      },
    };
  }
}
