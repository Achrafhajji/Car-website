import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {  Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { AuthlogoutService } from '../authlogout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent,FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = { Name_user: '', Surname_user: '', Phonenumber_user: '', City_user: '', Adresse_user: '', Email_user: '', Password_user: '' };
  constructor(private authService: AuthentificationService, private router: Router, private authServiceApp: AuthlogoutService, 
    private cdr: ChangeDetectorRef,  private zone: NgZone) { }
    errorMessageregister: string = ''; // Variable to store the error message


    register() {
      // Check if any required field is empty
      if (!this.user.Name_user || !this.user.Surname_user || !this.user.Phonenumber_user || !this.user.City_user || !this.user.Adresse_user || !this.user.Email_user || !this.user.Password_user) {
        this.errorMessageregister = 'Please fill in all the required fields';
        this.showWarning();
        return; // Stop further execution
      }
    
      // Proceed with registration if all fields are filled
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
          this.showWarning();
        }
      );
    }
    

    password: string = '';
    isPasswordVisible: boolean = false;
  
    togglePasswordVisibility(): void {
      this.isPasswordVisible = !this.isPasswordVisible;
    }

    isWarningVisible: boolean = false;

    showWarning() {
      this.isWarningVisible = true;
    }
  
    hideWarning() {
      this.isWarningVisible = false;
    }
}
