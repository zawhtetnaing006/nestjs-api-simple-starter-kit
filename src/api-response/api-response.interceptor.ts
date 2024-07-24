import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.successHandler(data);
      }),
      catchError((exception) => {
        this.errorHandler(exception, context);
        throw exception;
      }),
    );
  }

  successHandler(data: any) {
    return {
      status: 'success',
      data,
      timestamp: this.getCurrentTimeStamp(),
    };
  }

  errorHandler(exception: any, context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const res = httpContext.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({
      status: 'error',
      error: {
        code: status,
        message: exception.message,
      },
      timestamp: this.getCurrentTimeStamp(),
    });
  }

  getCurrentTimeStamp() {
    const padZero = (num) => (num < 10 ? '0' + num : num);
    const now = new Date();
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // Months are zero-based
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
