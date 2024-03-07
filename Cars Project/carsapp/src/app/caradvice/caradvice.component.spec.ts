import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaradviceComponent } from './caradvice.component';

describe('CaradviceComponent', () => {
  let component: CaradviceComponent;
  let fixture: ComponentFixture<CaradviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaradviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaradviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
