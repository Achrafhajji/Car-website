import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carsreviews',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './carsreviews.component.html',
  styleUrl: './carsreviews.component.css'
})
export class CarsreviewsComponent   {
  makes: { Name_makecar: string }[] = [];
  selectedMake: string = '';
  models: { Name_modelcar: string }[] = [];

  constructor(private http: HttpClient) { }

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
}


