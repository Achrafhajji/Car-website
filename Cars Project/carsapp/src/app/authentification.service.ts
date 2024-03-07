import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthlogoutService } from './authlogout.service';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'https://localhost:44366/api/Authentification';

  constructor(private http: HttpClient, private authService: AuthlogoutService) { }
setToken(token: string): void {
  // Store the token in your service or any other storage mechanism
  // For example, you can use localStorage or a dedicated state management solution
  // Note: Make sure to handle token security appropriately, don't store sensitive information in localStorage without proper encryption.
  localStorage.setItem('authToken', token);
}

register(user: any): Observable<any> {
    console.log('Register user:', user);

    return this.http.post(`${this.apiUrl}/register`, user, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        tap(
          (response: any) => {
            console.log('Register response:', response);

            if (response.Token) {
              this.setToken(response.Token);
            } else {
              console.error('Token not found in the response:', response);
            }

            // Use response.Name as needed in your application
            
          },
          (error: any) => console.error('Register error:', error)
        )
      );
  }

  login(user: any): Observable<any> {
    console.log('Login user:', user);

    return this.http.post(`${this.apiUrl}/login`, user, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        tap(
          (response: any) => {
            console.log('Login response:', response);

            if (response.Token) {
              this.setToken(response.Token);
            } else {
              console.error('Token not found in the response:', response);
            }

           
            
          },
          (error: any) => console.error('Login error:', error)
        )
      );
  }

  getUsernameByEmail(email: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/GetUsernameByEmail?email=${email}`);
  }

}
