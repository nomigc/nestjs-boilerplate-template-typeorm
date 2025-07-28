import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/strategy/jwt.strategy';
import { HashModule } from '@/services/hash/hash.module';
import { User } from '@/schemas/common';
import { UserModule } from '../user/user.module';
import { AppConfigService } from '@/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { JwtCustomModule } from '@/services/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    JwtCustomModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>('TOKEN_EXPIRE_IN'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AppConfigService, MailService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
