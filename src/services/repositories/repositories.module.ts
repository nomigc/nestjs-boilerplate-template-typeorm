import { Module } from '@nestjs/common';
import { BaseRepositoriesService } from './repositories.service';

@Module({
  providers: [BaseRepositoriesService],
  exports: [BaseRepositoriesService],
})
export class BaseRepositoriesModule {}
