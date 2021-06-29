import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.showLoading(request.url);

    return next.handle(request).pipe(
      delay(500),
      catchError((e) => {
        this.loader.hideLoading(request.url);
        return e;
      }),
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.loader.hideLoading(request.url);
        }
      })
    );
  }
}
