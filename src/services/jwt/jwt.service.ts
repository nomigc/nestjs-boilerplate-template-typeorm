import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwt, { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtCustomService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Generates a JSON Web Token (JWT) from the given payload.
   * @param {any} payload The payload to encode in the JWT.
   * @param {any} expiresIn The expiration time of the JWT.
   * @returns {Promise<string>} The generated JWT.
   */
  generateToken(
    payload: any,
    expiresIn: any = this.appConfigService.tokenExpiresIn,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.appConfigService.jwtSecretKey,
      expiresIn: expiresIn,
    });
  }
  /**
   * Validates a JSON Web Token (JWT) and returns its payload.
   * @param {string} token The JWT to validate.
   * @returns {string | JwtPayload} The decoded payload if the token is valid, otherwise throws an error.
   */

  validateToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.appConfigService.jwtSecretKey);
  }
}
