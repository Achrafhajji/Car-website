import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthlogoutService {
  private apiUrl = 'https://localhost:44366'; // Update with your API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');
  private userEmail: string = ''; // New property to store user email

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private zone: NgZone, private http: HttpClient) {}

 
  setAuthenticationStatus(isAuthenticated: boolean) {
    this.zone.run(() => {
      this.isAuthenticatedSubject.next(isAuthenticated);
    });
  }

  
  

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Authentification/Logout`, {})
      .pipe(
        tap(
          (response: any) => {
            console.log('Logout response:', response);
            // Optionally, clear the token from local storage or perform other client-side cleanup
            this.clearToken();
          },
          (error: any) => console.error('Logout error:', error)
        )
      );
  }
  
  private clearToken(): void {
    // Clear the token from local storage or any other client-side storage mechanism
    localStorage.removeItem('authToken');
  }
  setUserName(username: string) {
    this.zone.run(() => {
      this.userNameSubject.next(username);
    });
  }

  getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
}




