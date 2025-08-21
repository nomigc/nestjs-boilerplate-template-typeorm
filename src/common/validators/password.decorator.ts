import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordComplexity', async: false })
export class PasswordComplexityValidator implements ValidatorConstraintInterface {
  private lastErrors: string[] = [];

  validate(password: string, args: ValidationArguments): boolean {
    const errors: string[] = [];

    if (!/[a-z]/.test(password)) errors.push('lowercase');
    if (!/[A-Z]/.test(password)) errors.push('uppercase');
    if (!/\d/.test(password)) errors.push('number');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('special');
    if (password.length < 8) errors.push('minLength');
    if (password.length > 20) errors.push('maxLength');

    this.lastErrors = errors;
    return errors.length === 0;
  }

  defaultMessage(args: ValidationArguments): string {
    const messages: Record<string, string> = {
      lowercase: 'at least one lowercase letter',
      uppercase: 'at least one uppercase letter',
      number: 'at least one number',
      special: 'at least one special character',
      minLength: 'minimum length of 8 characters',
      maxLength: 'maximum length of 20 characters',
    };

    return `Password must contain ${this.lastErrors.map((e) => messages[e]).join(', ')}`;
  }
}
