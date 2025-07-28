import { AppConfigService } from '@/config/config.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private readonly appConfigService: AppConfigService) {}
  /**
   * Compares a plaintext password to a hashed password.
   * @param {string} password The plaintext password.
   * @param {string} hash The hashed password.
   * @returns {Promise<boolean>} A promise of a boolean that indicates if the password matches the hash.
   */
  compareHash = (password: string, hash: string): Promise<boolean> =>
    bcrypt.compare(password, hash);

  /**
   * Hashes a plaintext using bcrypt.
   * @param {string} text The plaintext text to hash.
   * @returns {Promise<string>} A promise of the hashed text.
   */
  createHash = (text: string): Promise<string> =>
    bcrypt.hash(text, this.appConfigService.saltRounds);
}
