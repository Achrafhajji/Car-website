import { Component } from '@angular/core';
import { AfficheadvicesService } from '../afficheadvices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caradvice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caradvice.component.html',
  styleUrl: './caradvice.component.css'
})
export class CaradviceComponent {
  advices: any[] = [];
  
  constructor(private advicerService: AfficheadvicesService) { }

  ngOnInit() {
    this.advicerService.GetAdvices().subscribe(data => {
      this.advices = data;
    });
    (    error: any) => {
      console.error('Error fetching data:', error);
    }
  }
  
}
