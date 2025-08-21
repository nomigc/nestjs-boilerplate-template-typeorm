import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EmailErrorType } from '../enum';
import { isDisposableEmail } from '@/utils';

@ValidatorConstraint({ name: 'DeliverableEmail', async: true })
export class DeliverableEmailValidator implements ValidatorConstraintInterface {
  private lastErrors: EmailErrorType[] = [];

  private fail(error: EmailErrorType): boolean {
    this.lastErrors = [error];
    return false;
  }

  async validate(value: string): Promise<boolean> {
    this.lastErrors = [];

    if (!value || typeof value !== 'string' || !value.trim()) {
      return this.fail(EmailErrorType.EMPTY);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return this.fail(EmailErrorType.SYNTAX);
    }

    try {
      const normalizedEmail = value.trim().toLowerCase();

      const isDisposable = await isDisposableEmail(normalizedEmail);
      if (isDisposable) {
        return this.fail(EmailErrorType.DISPOSABLE);
      }

      const domain = normalizedEmail.split('@')[1];

      const dns = await import('dns').then((m) => m.promises);
      try {
        const mxRecords = await dns.resolveMx(domain);
        if (!mxRecords || mxRecords.length === 0) {
          return this.fail(EmailErrorType.MX);
        }
      } catch {
        return this.fail(EmailErrorType.MX);
      }

      return true;
    } catch (error) {
      console.error('Email validation error:', error);
      this.lastErrors.push(EmailErrorType.UNKNOWN);
      return false;
    }
  }

  defaultMessage(_: ValidationArguments): string {
    const messages: Record<EmailErrorType, string> = {
      [EmailErrorType.EMPTY]: 'Email is required',
      [EmailErrorType.SYNTAX]: 'Email format is invalid',
      [EmailErrorType.TYPO]: 'Email domain may be a typo',
      [EmailErrorType.DISPOSABLE]: 'Disposable email addresses are not allowed',
      [EmailErrorType.MX]: 'Email domain has no valid MX records',
      [EmailErrorType.UNKNOWN]: 'Email could not be validated',
    };

    return this.lastErrors.map((key) => messages[key] ?? 'Unknown error').join(', ');
  }
}
