import { AppConfigModule } from '@/config/config.module';
import { Module } from '@nestjs/common';
import { JwtCustomService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AppConfigModule, JwtModule],
  providers: [JwtCustomService],
  exports: [JwtCustomService],
})
export class JwtCustomModule {}
