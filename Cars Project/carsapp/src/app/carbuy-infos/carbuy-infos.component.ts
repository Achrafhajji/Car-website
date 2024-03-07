import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { Location } from '@angular/common';
import { CarselectedService } from '../carselected.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carbuy-infos',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FooterComponent],
  providers:[CarselectedService],
  templateUrl: './carbuy-infos.component.html',
  styleUrl: './carbuy-infos.component.css'
})
export class CarbuyInfosComponent implements OnInit {
  constructor(private location: Location, private elementRef: ElementRef, private route: ActivatedRoute,   private carService: CarselectedService
    ) { }
  goBack() {
    this.location.back();
  }
  carDetails: any; // Vous pouvez créer une interface pour typage


  ngOnInit(): void {
    const carIdString = this.route.snapshot.paramMap.get('id');
    if (carIdString !== null) {
      const carId = Number(carIdString);
      this.carService.getCarDetails(carId).subscribe((data: any) => {
        this.carDetails = data;
      });
    }
  }
  
}