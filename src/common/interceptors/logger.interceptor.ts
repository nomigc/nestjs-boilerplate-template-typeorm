import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime: any = new Date();
        const restTime = endTime - startTime;

        console.log(
          `${request.method} ${request.url} ${response.statusCode} ${restTime}ms`,
        );
      }),
    );
  }
}
