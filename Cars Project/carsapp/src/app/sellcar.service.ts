import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellcarService {
  private apiUrl = 'https://localhost:44366/api/Sellcar/Postcar';

  constructor(private http: HttpClient) {}

  postCar(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
