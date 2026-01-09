import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
      tap(() => {
        const time = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${time}ms`);
      }),
    );
  }
}
