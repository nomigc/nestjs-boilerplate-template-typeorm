import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  //* Application Global Credentials

  get mode(): string {
    return this.configService.get<string>('MODE', 'dev')!; //* Default: 'dev'
  }

  get port(): number {
    return Number(this.configService.get<number>('PORT', 3000))!; //* Default: 3000
  }

  //* Backend URLs

  get localBackendUrl(): string {
    return this.configService.get<string>('LOCAL_BACKEND_URL')!;
  }

  get prodBackendUrl(): string {
    return this.configService.get<string>('PROD_BACKEND_URL')!;
  }

  get serverPath(): string {
    return this.mode === 'prod' ? this.prodBackendUrl : this.localBackendUrl;
  }

  //* Frontend URLs

  get localFrontendUrl(): string {
    return this.configService.get<string>('LOCAL_FRONTEND_URL')!;
  }

  get prodFrontendUrl(): string {
    return this.configService.get<string>('PROD_FRONTEND_URL')!;
  }

  get clientPath(): string {
    return this.mode === 'prod' ? this.prodFrontendUrl : this.localFrontendUrl;
  }

  //* JWT Credentials

  get jwtSecretKey(): string {
    return this.configService.get<string>('JWT_KEY')!;
  }

  get tokenExpiresIn(): string {
    return this.configService.get<string>('TOKEN_EXPIRE_IN', '1h')!; //* Default: 1 hour
  }

  get saltRounds(): number {
    return Number(this.configService.get<number>('HASH_SLAT_ROUND', 10))!; //* Default: 10
  }

  //* SESSION CREDENTIALS

  get sessionSecret(): string {
    return this.configService.get<string>('SESSION_SECRET')!;
  }

  get sessionResave(): boolean {
    return Boolean(this.configService.get<boolean>('SESSION_RESAVE'))!;
  }

  get sessionSaveUninitialized(): boolean {
    return Boolean(this.configService.get<boolean>('SESSION_SAVE_UNINITIALIZED', false))!;
  }

  get sessionSecure(): boolean {
    return Boolean(this.configService.get<boolean>('SESSION_SECURE', true))!;
  }

  get envSessionSecure(): boolean {
    return this.mode === 'prod' ? this.sessionSecure : false;
  }

  //* API Credentials

  get apiVersion(): string {
    return this.configService.get<string>('API_VERSION')!;
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX')!;
  }

  //* DB Credentials

  get dbType(): string {
    return this.configService.get<string>('DB_TYPE')!;
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST')!;
  }

  get dbPort(): number {
    return Number(this.configService.get<number>('DB_PORT', 5432))!;
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME')!;
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD')!;
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME')!;
  }

  get dbUri(): string {
    return this.configService.get<string>('DB_URI')!;
  }

  //* Typeorm Credentials

  get typeormSynchronize(): boolean {
    return Boolean(this.configService.get<boolean>('TYPEORM_SYNCHRONIZE', false))!;
  }

  get typeormLogging(): boolean {
    return Boolean(this.configService.get<boolean>('TYPEORM_LOGGING', false))!;
  }

  get envTypeormSynchronize(): boolean {
    return this.mode === 'prod' ? this.typeormSynchronize : true;
  }

  get envTypeormLogging(): boolean {
    return this.mode === 'prod' ? this.typeormLogging : true;
  }

  //* Nodemailer Credentials

  get mailHost(): string {
    return this.configService.get<string>('NODEMAILER_HOST')!;
  }

  get mailPort(): number {
    return Number(this.configService.get<number>('NODEMAILER_PORT', 587))!;
  }

  get mailService(): string {
    return this.configService.get<string>('NODEMAILER_SERVICE')!;
  }

  get mailUser(): string {
    return this.configService.get<string>('NODEMAILER_USER')!;
  }

  get mailPassword(): string {
    return this.configService.get<string>('NODEMAILER_PASSWORD')!;
  }

  //* Cookie Credentials

  get cookieSecure(): boolean {
    return this.configService.get<boolean>('COOKIE_SECURE')!;
  }

  get envCookieSecure(): boolean {
    return this.mode === 'prod' ? this.cookieSecure : false;
  }

  get cookieHttpOnly(): boolean {
    return this.configService.get<boolean>('COOKIE_HTTP_ONLY')!;
  }

  get envCookieHttpOnly(): boolean {
    return this.mode === 'prod' ? this.cookieHttpOnly : false;
  }

  get cookieSameSite(): string {
    return this.configService.get<string>('COOKIE_SAME_SITE', 'lax')!;
  }

  get envCookieSameSite(): any {
    return this.mode === 'prod' ? this.cookieSameSite : 'lax';
  }
}
