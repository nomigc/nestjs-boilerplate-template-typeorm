import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database connection established');
      } else {
        await this.dataSource.initialize();
        console.log('Database was not initialized, now connected');
      }
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
