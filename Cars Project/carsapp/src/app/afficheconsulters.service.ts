import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfficheconsultersService {
  private apiUrl = 'https://localhost:44366/Api/Consulters';

  constructor(private http: HttpClient) { }
  GetConsulters(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
