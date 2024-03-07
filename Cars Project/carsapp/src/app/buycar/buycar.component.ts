import { Component, OnInit,  } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { BuycarService } from '../buycar.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CarselectedService } from '../carselected.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buycar',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, CommonModule,FormsModule],
    providers: [BuycarService, CarselectedService ],
  templateUrl: './buycar.component.html',
  styleUrl: './buycar.component.css'
})
export class BuycarComponent implements OnInit {
  cars: any[] = [];

  constructor(private buycarService: BuycarService, private sanitizer: DomSanitizer, private http: HttpClient, 
    private carSelectionService: CarselectedService,     private router: Router,
    ) {}
  public showModal: boolean = false;
  public selectedCar: any;


  ngOnInit(): void {
    this.buycarService.getCars().subscribe((data) => {
      this.cars = data.map((car) => {
        car.firstImage = this.extractFirstImage(car.Vehicule_Pictures);

        console.log('Base64 Image:', car.firstImage);

        return car;
      });
    });
    this.http.get<{ Name_makecar: string }[]>('https://localhost:44366/Api/Make_cars').subscribe(makes => {
      this.makes = makes;
    });
    this.generateMinPriceOptions();
    this.generateMaxPriceOptions();

  }

  private extractFirstImage(pictures: string): string {
    const imagesArray = pictures.split(',');
    return imagesArray.length > 0 ? imagesArray[0] : '';
  }
  
  getImageSource(base64String: string): string {
    // Check if the base64 string is not empty
    if (base64String) {
        // Determine the image format (assuming base64String contains a valid base64 image)
        const format = base64String.startsWith('/9j/') ? 'jpeg' : 'png'; // Add more conditions for other formats if needed

        // Construct the image source with the appropriate format
        return `data:image/${format};base64,${base64String}`;
    }

    // Return a placeholder image or an empty string if base64String is empty
    return 'path/to/placeholder-image.jpg';
}
isLiked: boolean = false;

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }
  years: number[] = this.generateYears(1980, 2024); // tableau d'années

  private generateYears(start: number, end: number): number[] {
    const yearsArray: number[] = [];
    for (let year = start; year <= end; year++) {
      yearsArray.push(year);
    }
    return yearsArray;
  }
  selectedMake: string = '';
  models: { Name_modelcar: string }[] = [];
  makes: { Name_makecar: string }[] = [];
  selectedModel: string = '';

  onMakeChange() {
    // Fetch models based on the selected make
    if (this.selectedMake) {
      this.http.get<{ Name_modelcar: string }[]>(`https://localhost:44366/api/Model_cars?Name_makecar=${this.selectedMake}`).subscribe(models => {
        this.models = models;
      });
    } else {
      this.models = []; // Reset models if no make is selected
    }
  }
  minPriceOptions: number[] = [];
  maxPriceOptions: number[] = [];

  generateMinPriceOptions(): void {
    const increment = 5000; // Increment by $5,000
    const maxPrice = 100000; // Maximum price $150,000

    for (let price = increment; price <= maxPrice; price += increment) {
      this.minPriceOptions.push(price);
    }
  }

  generateMaxPriceOptions(): void {
    const startPrice = 105000;
    const endPrice = 200000;
    const increment = 5000;

    for (let price = startPrice; price <= endPrice; price += increment) {
      this.maxPriceOptions.push(price);
    }
  }
  redirectToCarDetails(carId: number) {
    this.router.navigate(['/carbuyinfo', carId]);
}
  
}