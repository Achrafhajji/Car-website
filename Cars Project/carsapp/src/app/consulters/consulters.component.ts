import { Component, OnInit } from '@angular/core';
import { AfficheconsultersService } from '../afficheconsulters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulters.component.html',
  styleUrl: './consulters.component.css'
})
export class ConsultersComponent implements OnInit  {
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
