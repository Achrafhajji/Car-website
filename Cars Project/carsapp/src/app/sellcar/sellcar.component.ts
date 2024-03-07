import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient } from '@angular/common/http';
import { SellcarService } from '../sellcar.service';
@Component({
  selector: 'app-sellcar',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule,CommonModule],
  providers:[SellcarService],
  templateUrl: './sellcar.component.html',
  styleUrl: './sellcar.component.css'
})
export class SellcarComponent {
  constructor(private http: HttpClient, private sellcarService: SellcarService){}

  selectedYear: number | null = null; // initialize to null
  years: number[] = this.generateYears(1980, 2024); // tableau d'années

  makes: { Name_makecar: string }[] = [];
  selectedMake: string = '';
  models: { Name_modelcar: string }[] = [];
  selectedModel: string = '';
  horsepower: number = 0;
  kilometrage: number = 0;
  selectedFirstHand: string = '';
  doorsNumber: number = 0;
  selectedFuel: string = '';
  selectedTransmission: string = '';
  sellPrice: number = 0;
  description: string = '';
  picturesCount: number = 0;

  // Fonction pour générer un tableau d'années
  private generateYears(start: number, end: number): number[] {
    const yearsArray: number[] = [];
    for (let year = start; year <= end; year++) {
      yearsArray.push(year);
    }
    return yearsArray;
  }
  uploads: { preview: string; uploaded: boolean; pictures: File[] }[] = [];

  addNewUpload(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    this.uploads.push({
      preview: '',
      uploaded: false,
      pictures: []
    });
    this.picturesCount++; // Increment the count

  }

  removeUpload(index: number) {
    this.uploads.splice(index, 1);
    this.picturesCount--; // Decrement the count

  }
  

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.uploads[index].pictures = [file]; // Store the File object in the pictures property
      this.readAndPreview(file, index);
    }
  }
    

  readAndPreview(file: File, index: number) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.uploads[index].preview = reader.result as string;
      this.uploads[index].uploaded = true; // Set uploaded property to true
    };

    reader.readAsDataURL(file);
  }

  // ... other methods like removeUpload, addNewUpload, etc.

  previewImage(index: number) {
    const input = document.getElementById(`up${index}`) as HTMLInputElement;
    input.click();
  }

  ngOnInit() {
    // Fetch makes directly in the component
    this.http.get<{ Name_makecar: string }[]>('https://localhost:44366/Api/Make_cars').subscribe(makes => {
      this.makes = makes;
    });
  }

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
  carAdded: boolean = false;

  onSubmit() {
    // Create a FormData object to send the form data including files
    const formData = new FormData();
  
    // Append form values to FormData
    formData.append('make', this.selectedMake);
    formData.append('model', this.selectedModel);
    formData.append('year', String(this.selectedYear));
    formData.append('horsepower', this.horsepower.toString()); // Convert to string
    formData.append('kilometrage', this.kilometrage.toString()); // Convert to string
    formData.append('firsthand', this.selectedFirstHand);
    formData.append('doorsNumber', this.doorsNumber.toString());
    formData.append('fuel', this.selectedFuel);
    formData.append('transmission', this.selectedTransmission);
    formData.append('sellPrice', this.sellPrice.toString()); // Convert to string
  
    formData.append('description', this.description);
  
    // Append each file to FormData
    this.uploads.forEach((upload, index) => {
      if (upload.uploaded) {
        // Convert File to Blob
        const blob = new Blob([upload.pictures[0]], { type: 'image/jpeg' });
        formData.append(`file${index}`, blob);
      }
    });
  
    // Call the service to post the form data
    this.sellcarService.postCar(formData).subscribe(
      response => {
        console.log('Car added successfully:', response);
        // Handle success (e.g., navigate to a success page)
        this.carAdded = true;
         // Clear form fields and reset properties
      this.selectedMake = '';
      this.selectedModel = '';
      this.selectedYear = null;
      this.horsepower = 0;
      this.kilometrage = 0;
      this.selectedFirstHand = '';
      this.doorsNumber = 0;
      this.selectedFuel = '';
      this.selectedTransmission = '';
      this.sellPrice = 0;
      this.description = '';
      this.uploads = [];
      this.picturesCount = 0;

      },
      error => {
        console.error('Failed to add car:', error);
        // Handle error
      });
  }
  
}
