import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthlogoutService } from '../authlogout.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',

  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
 

})
export class HeaderComponent {
  isAuthenticated: boolean = false;
   username: string = '';

  constructor(private authService: AuthlogoutService, private router: Router ) {}
 
  showDropdown = false;

// header.component.ts
ngOnInit() {
  console.log('HeaderComponent ngOnInit');
  this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
    console.log('Authentication status changed:', isAuthenticated);
    this.isAuthenticated = isAuthenticated;
  });

  this.authService.getUserName().subscribe((username) => {
    console.log('Username changed:', username);
    this.username = username;
  });
}
logout() {
  this.authService.setAuthenticationStatus(false);

  const logoutSubscription = this.authService.logout().subscribe(
    () => {
      console.log('Logout successful');
      this.router.navigate(['/']);
    },
    (error) => {
      console.error('Logout error:', error);
    },
    () => {
      // This block will be executed when the observable completes or encounters an error
      logoutSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  );
}

}