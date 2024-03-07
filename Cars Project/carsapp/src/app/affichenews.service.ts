import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffichenewsService {

  private apiUrl = 'https://localhost:44366/api/News';

  constructor(private http: HttpClient) { }
  GetNews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  GetNewsByType(typenews: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetNewsbytype?typenews=${typenews}`);
  }
}
