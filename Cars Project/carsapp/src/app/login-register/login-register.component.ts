import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { FormsModule } from '@angular/forms';
import { AuthlogoutService } from '../authlogout.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css',

})
export class LoginRegisterComponent {
  user = { Name_user: '', Surname_user: '', Phonenumber_user: '', City_user: '', Adresse_user: '', Email_user: '', Password_user: '' };
  user_login = {  Email_user: '', Password_user: '' };
  constructor(private authService: AuthentificationService, private router: Router, private authServiceApp: AuthlogoutService, 
    private cdr: ChangeDetectorRef,  private zone: NgZone) { }
    errorMessagelogin: string = ''; // Variable to store the error message
    errorMessageregister: string = ''; // Variable to store the error message
    login() {
      this.authService.login(this.user_login).subscribe(
        (response: any) => {
          this.zone.run(() => {
            console.log('Login response:', response);
    
            if (response.Token) {
              // Set the token and user email in your AuthService
              this.authService.setToken(response.Token);
    
              // Set the authentication status and user email
              this.authServiceApp.setAuthenticationStatus(true);
    
              this.authService.getUsernameByEmail(this.user_login.Email_user).subscribe(
                (username: string) => {
                  // Use the username as needed in your application
                  this.authServiceApp.setUserName(username);
                  console.log('Username:', username);
                },
                (error) => {
                  console.error('Error fetching username:', error);
                }
              );
              
    
              // Redirect to a protected page or any other logic you want
              this.router.navigate(['/']);
            } else {
              console.error('Token not found in the response:', response);
              this.errorMessagelogin = 'Authentication failed';
            }
          });
        },
        (error) => {
          console.error('Email or password incorrect:', error);
          this.errorMessagelogin = 'Email or Password incorrect';
        }
      );
    }
    
    
  
    register() {
      this.authService.register(this.user).subscribe(
        (response: any) => {
          console.log('Register response:', response);
  
          // Assuming response.Token contains the JWT token
          if (response.Token) {
            // Set the token in your AuthService
            this.authService.setToken(response.Token);
  
            // Set the authentication status
            this.authServiceApp.setAuthenticationStatus(true);
  
            this.authService.getUsernameByEmail(this.user.Email_user).subscribe(
              (username: string) => {
                // Use the username as needed in your application
                this.authServiceApp.setUserName(username); // Set the username

                console.log('Username:', username);
              },
              (error) => {
                console.error('Error fetching username:', error);
              }
            );
  
            // Navigate to the desired page
            this.router.navigate(['/']);
  
            // Manually run change detection
            this.cdr.detectChanges();
          } else {
            console.error('Token not found in the response:', response);
          }
        },
        (error) => {
          console.error('Registration error:', error);
          this.errorMessageregister = 'This user already exists'; // Set a meaningful error message
        }
      );
    }
    


}