import { CustomUnauthorizedException } from '@/utils';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.session.user) {
      throw new CustomUnauthorizedException('Not authenticated');
    }
    return true;
  }
}
