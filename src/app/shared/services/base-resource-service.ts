import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseResourceModel } from "../models/base-resource-model";

export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;

    constructor(protected apiPath: string, protected injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.apiPath}`).pipe(
            catchError(this.handleError)
        )
    }

    getById(id: string | number | null = '0'): Observable<T> {
        return this.http.get<T>(`${this.apiPath}/${id}`).pipe(
            catchError(this.handleError)
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post<T>(`${this.apiPath}`, resource).pipe(
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        return this.http.put(`${this.apiPath}`, resource).pipe(
            catchError(this.handleError),
            map(() => resource)
        )
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiPath}/${id}`).pipe(
            catchError(this.handleError)
        )
    }

    protected handleError(error: any): Observable<any> {
        console.log(error);
        return throwError(error);
    }
}
