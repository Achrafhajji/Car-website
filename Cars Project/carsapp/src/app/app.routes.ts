import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BuycarComponent } from './buycar/buycar.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SellcarComponent } from './sellcar/sellcar.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CarbuyInfosComponent } from './carbuy-infos/carbuy-infos.component';
import { HdrComponent } from './hdr/hdr.component';
import { BuytipsComponent } from './buytips/buytips.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
export const routes: Routes = [
    { path: 'news', component: AccueilComponent }, // Define a specific route for "News"
    { path: 'buycar', component: BuycarComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'sellcar', component: SellcarComponent },
    { path: 'auth', component: LoginRegisterComponent },
    { path: 'carbuyinfo/:id', component: CarbuyInfosComponent },
    { path: 'hdr', component: HdrComponent },
    { path: 'buytips', component: BuytipsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    { path: '', redirectTo: 'news', pathMatch: 'full' }, // Redirect empty path to "News"
];
