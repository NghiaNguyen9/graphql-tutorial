import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})

export class HttpApiService {
    private baseUrl = environment.BASE_URL;
    constructor(private http: HttpClient) { }
    callPostApi(uri: string, bodyRequest: any): Observable<any> {
        return this.http.post(this.baseUrl + uri, bodyRequest, {
            observe: 'response'
        })
    }

    callGetApi<R>(uri: string, bodyRequest: any): Observable<R> {
        return this.http
            .get<R>(
                this.baseUrl + uri,
                {
                    observe: 'response',
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