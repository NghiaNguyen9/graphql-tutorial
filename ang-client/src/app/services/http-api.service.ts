import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})

export class HttpApiService {
    constructor(private http: HttpClient,) {

    }

    callPostApi<R>(bodyRequest: any): Observable<R> {
        const baseUrl = 'http://localhost:4200';
        return this.http
            .post<R>(
                baseUrl,
                {
                    body: bodyRequest
                },
                {
                    observe: 'response'
                }
            )
            .pipe(
                map((res: HttpResponse<any>) => res.body),
                catchError((err) => {
                    return [err];
                })
            );
    }

    isResponseSuccess(res: any): boolean {
        return (
            res &&
            res.body &&
            res.body.status === 'OK' &&
            res.body.data
        );
    }
}