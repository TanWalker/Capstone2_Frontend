import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor( private authService: AuthService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let ok: string;
        const started = Date.now();

        // get auth token
        const token = this.authService.getToken();

           // check for token
           if (token) {
            const authReq = req.clone({ setHeaders: { Authorization: token } });

            return next.handle(authReq)
            .pipe(
                tap(
                    // Succeeds when there is a response; ignore other events
                    event => ok = event instanceof HttpResponse ? 'succeeded' : '',
                    // Operation failed; error is an HttpErrorResponse
                    error => ok = 'failed'
                ),
                // Log when response observable either completes or errors
                finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `${req.method} "${req.urlWithParams}"
                    ${ok} in ${elapsed} ms.`;
                })
            );

        } else {
            return next.handle(req);
        }

    }
}
