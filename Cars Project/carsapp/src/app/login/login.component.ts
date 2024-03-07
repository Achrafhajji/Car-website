import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthentificationService } from '../authentification.service';
import { AuthlogoutService } from '../authlogout.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthentificationService, private router: Router, private authServiceApp: AuthlogoutService, 
    private cdr: ChangeDetectorRef,  private zone: NgZone) { }
  password: string = '';
  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  user = { Name_user: '', Surname_user: '', Phonenumber_user: '', City_user: '', Adresse_user: '', Email_user: '', Password_user: '' };
  user_login = {  Email_user: '', Password_user: '' };
  errorMessagelogin: string = ''; // Variable to store the error message
  isActive: boolean = false;
  timer1: any;
  timer2: any;
  
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
        this.showWarning(); // Show the warning message

      }
    );
  }
  
  isWarningVisible: boolean = false;

  showWarning() {
    this.isWarningVisible = true;
  }

  hideWarning() {
    this.isWarningVisible = false;
  }

}
