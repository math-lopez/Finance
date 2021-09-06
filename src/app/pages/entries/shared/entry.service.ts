import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath: string = "api/entries"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiPath}`).pipe(
      catchError(this.handleError)
      // map(this.jsonDataToCategories)
    )
  }

  getById(id: string | null = '0'): Observable<Entry> {
    return this.http.get<Entry>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${this.apiPath}`, entry).pipe(
      catchError(this.handleError)
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}`, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
