import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsreviewsComponent } from './carsreviews.component';

describe('CarsreviewsComponent', () => {
  let component: CarsreviewsComponent;
  let fixture: ComponentFixture<CarsreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsreviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarsreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
