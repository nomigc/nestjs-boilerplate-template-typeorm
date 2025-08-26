import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/strategy/jwt.strategy';
import { HashModule } from '@/services/hash/hash.module';
import { User } from '@/schemas/common';
import { AppConfigService } from '@/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { JwtCustomModule } from '@/services/jwt/jwt.module';
import { Group } from '../groups-and-menus/groups/entities';
import { UserRepository } from './auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group]),
    HashModule,
    JwtCustomModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: parseInt(configService.getOrThrow<string>('TOKEN_EXPIRE_IN')),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AppConfigService, MailService, UserRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
