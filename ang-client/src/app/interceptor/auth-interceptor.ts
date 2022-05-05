import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpApiService } from '../services/http-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private tokenSrv: TokenStorageService, private httpSrv: HttpApiService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ headers: req.headers.append('Content-Type', 'application/json'), withCredentials: true });
        console.log('Request: ', req);
        return next.handle(req).pipe(
            catchError(error => {
                if (req.url.includes("login") || req.url.includes("refreshtoken")) {
                    if (req.url.includes("refreshtoken")) {
                        this.tokenSrv.signOut();
                    }
                    return throwError(error);
                }
                if (error.status !== 401) {
                    return throwError(error);
                }
                return this.handle401Error(req, next);
            })
        )

    }
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        debugger
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            this.httpSrv.callPostApi('/refreshToken', {}).pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.accessToken);
                    return next.handle(this.addAuthenticationToken(request, token.accessToken))
                }),
                catchError((err) => {
                    this.isRefreshing = false;

                    this.tokenSrv.signOut();
                    return throwError(err);
                })
            );
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addAuthenticationToken(request, token)))
        );
    }
    addAuthenticationToken(request: any, token: string): HttpRequest<any> {
        if (!token) {
            return request;
        }

        // We clone the request, because the original request is immutable
        return request.clone({
            setHeaders: {
                Authorization: token
            }
        });
    }
}