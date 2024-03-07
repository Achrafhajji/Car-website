import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarselectedService {

  private selectedCarSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedCar$: Observable<any> = this.selectedCarSubject.asObservable();

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:44366/api'; // Remplacez par l'URL de votre API

  getCarDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/carbuyinfo/${id}`; // Assurez-vous que l'URL est correcte
    return this.http.get<any>(url);
  }
}
