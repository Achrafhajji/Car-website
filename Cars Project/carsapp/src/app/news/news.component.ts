import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AffichenewsService } from '../affichenews.service';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [FormsModule,CommonModule],
  providers: [AffichenewsService],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  // Définissez l'URL de votre API
  private apiUrl = 'https://localhost:44366/api/News_type'; // Remplacez par l'URL réelle de votre API

  // Initialisez un tableau pour stocker les types de nouvelles
  public typesNews: any[] = [];
  selectedNewsType: string = '';
  news: any[] = [];
  newsnews: any[] = [];

  // Injectez le service HttpClient dans le constructeur
  constructor(private http: HttpClient,private newsService: AffichenewsService, private renderer: Renderer2, private el: ElementRef) { }
  autoSlideInterval: any;

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      const currentIndex = this.getCurrentSlideIndex();
      const nextIndex = (currentIndex + 1) % this.news.length;
      this.selectSlide(nextIndex);
    }, 3000); // Change 5000 to the desired interval in milliseconds
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  getCurrentSlideIndex(): number {
    const checkedInput = this.el.nativeElement.querySelector('input[name="radio-buttons"]:checked');
    return checkedInput ? +checkedInput.id.split('-')[1] - 1 : 0;
  }

  selectSlide(index: number) {
    const radioId = `img-${index + 1}`;
    const radioInput = this.el.nativeElement.querySelector(`input#${radioId}`);
    if (radioInput) {
      radioInput.checked = true;
    }
  }
  // Méthode pour charger les types de nouvelles depuis l'API
  loadTypesNews() {
    this.http.get<any[]>(this.apiUrl + '/GetTypeNews')
      .subscribe(data => {
        this.typesNews = data;
      });
  }

  ngOnInit() {
    this.loadTypesNews(); // Set the initial state to show all news type

    this.newsService.GetNews().subscribe(
      data => {
        this.news = data; // Set the initial state to show all news slides
        this.newsnews = data; // Set the initial state to show all news cards

      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

getArray(length: number): number[] {
  return Array.from({ length }, (_, index) => index + 1);
}

// search button method
searchNews() {
  if (this.selectedNewsType) {
    this.newsService.GetNewsByType(this.selectedNewsType).subscribe(
      data => {
        this.newsnews = data; //les cards affichent les news désirés
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  } 
}

}