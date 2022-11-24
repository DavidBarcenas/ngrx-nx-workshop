import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  catchError,
  delay,
  Observable,
  switchMap,
  throwError,
  timer,
} from 'rxjs';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      delay((Math.random() + 1) * 1000),
      catchError((error) => {
        return timer((Math.random() + 1) * 1000).pipe(
          switchMap(() => throwError(() => error))
        );
      })
    );
  }
}
