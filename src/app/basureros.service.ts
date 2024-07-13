import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Basurero } from './models/basurero.model';

@Injectable({
  providedIn: 'root'
})
export class BasurerosService {
  private apiUrl = 'http://localhost:3000/basureros'; // Ajusta la URL a tu API

  constructor(private http: HttpClient) {}

  getBasureros(): Observable<Basurero[]> {
    return this.http.get<Basurero[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  addBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.post<Basurero>(this.apiUrl, basurero)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.put<Basurero>(`${this.apiUrl}/${basurero.id}`, basurero)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBasurero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return throwError('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
  }
}
