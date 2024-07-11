import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Basurero {
  id: number | null;
  name: string;
  location: string;
  incharge: string;
  capacity: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasurerosService {
  private apiUrl = 'http://localhost:3000/basureros'; 

  constructor(private http: HttpClient) {}

  getBasureros(): Observable<Basurero[]> {
    return this.http.get<Basurero[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.post<Basurero>(this.apiUrl, basurero).pipe(
      catchError(this.handleError)
    );
  }

  updateBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.put<Basurero>(`${this.apiUrl}/${basurero.id}`, basurero).pipe(
      catchError(this.handleError)
    );
  }

  deleteBasurero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en la API:', error);
    return throwError(error);
  }
}
