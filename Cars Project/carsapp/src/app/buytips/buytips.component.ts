import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-buytips',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './buytips.component.html',
  styleUrl: './buytips.component.css'
})
export class BuytipsComponent {

}
