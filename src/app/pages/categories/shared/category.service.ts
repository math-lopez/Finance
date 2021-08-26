import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiPath}`).pipe(
      catchError(this.handleError)
      // map(this.jsonDataToCategories)
    )
  }

  getById(id: string | null = '0'): Observable<Category> {
    return this.http.get<Category>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiPath}`, category).pipe(
      catchError(this.handleError)
    )
  }

  update(category: Category): Observable<Category> {
    return this.http.put(`${this.apiPath}`, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // private jsonDataToCategories(jsonData: any[]): Category[] {
  //   const categories: Category[] = [];

  //   jsonData.forEach(e => {
  //     categories.push(e as Category)
  //   });

  //   return categories;
  // }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error);
  }
}
