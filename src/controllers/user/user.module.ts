import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@/schemas/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
