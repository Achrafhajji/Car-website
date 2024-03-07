import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AfficheconsultersService } from '../afficheconsulters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [
    HeaderComponent, FooterComponent, CommonModule
  ],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent implements OnInit  {
  consulters: any[] = [];

  constructor(private consulterService: AfficheconsultersService) { }

  ngOnInit() {
    this.consulterService.GetConsulters().subscribe(data => {
      this.consulters = data;
    });
    (    error: any) => {
      console.error('Error fetching data:', error);
    }
  }
}