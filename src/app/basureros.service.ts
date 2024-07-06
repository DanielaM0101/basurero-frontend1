import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Basurero {
  id?: number;
  name: string;
  location: string;
  incharge: string;
  capacity: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasurerosService {
  private apiUrl = 'http://localhost:3000/basureros';

  constructor(private http: HttpClient) {}

  getBasureros(): Observable<Basurero[]> {
    return this.http.get<Basurero[]>(this.apiUrl);
  }

  getBasurero(id: number): Observable<Basurero> {
    return this.http.get<Basurero>(`${this.apiUrl}/${id}`);
  }

  addBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.post<Basurero>(this.apiUrl, basurero);
  }

  updateBasurero(basurero: Basurero): Observable<Basurero> {
    return this.http.put<Basurero>(`${this.apiUrl}/${basurero.id}`, basurero);
  }

  deleteBasurero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}