import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { AppConfigModule } from '@/config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
