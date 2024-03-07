import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BuycarComponent } from './buycar/buycar.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SellcarComponent } from './sellcar/sellcar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { ConsultersComponent } from './consulters/consulters.component';
import { HttpClientModule } from '@angular/common/http';
import { AfficheconsultersService } from './afficheconsulters.service';
import { CaradviceComponent } from './caradvice/caradvice.component';
import { AfficheadvicesService } from './afficheadvices.service';
import { CarsreviewsComponent } from './carsreviews/carsreviews.component';
import { NewsComponent } from './news/news.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthentificationService } from './authentification.service';
import { AuthlogoutService } from './authlogout.service';
import { CarbuyInfosComponent } from './carbuy-infos/carbuy-infos.component';
import { RouterModule } from '@angular/router';
import { HdrComponent } from './hdr/hdr.component';
import { BuytipsComponent } from './buytips/buytips.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AccueilComponent, BuycarComponent, HeaderComponent, ContactComponent, AboutusComponent, 
 SellcarComponent, FooterComponent , ConsultersComponent, NgbModule, HttpClientModule, CaradviceComponent
  ,CarsreviewsComponent,NewsComponent,LoginRegisterComponent, CarbuyInfosComponent,HdrComponent,BuytipsComponent,LoginComponent,SignupComponent,TestComponent],
  providers: [AfficheconsultersService,AfficheadvicesService,AuthentificationService,AuthlogoutService],
   templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carsapp';
 
}
 