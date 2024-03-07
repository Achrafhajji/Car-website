import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfficheadvicesService {
  private apiUrl = 'https://localhost:44366/Api/Caradvice';

  constructor(private http: HttpClient) { }
  GetAdvices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
