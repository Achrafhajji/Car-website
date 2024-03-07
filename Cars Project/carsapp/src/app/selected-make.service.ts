import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedMakeService {

  private baseUrl = 'https://localhost:44366/api';

  constructor(private http: HttpClient) { }

  getModels(make: string): Observable<string[]> {
    const url = `${this.baseUrl}/model_cars?Name_makecar=${make}`;
    return this.http.get<string[]>(url);
  }
}
