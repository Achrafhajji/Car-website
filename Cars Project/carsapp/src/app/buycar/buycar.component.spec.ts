import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuycarComponent } from './buycar.component';

describe('BuycarComponent', () => {
  let component: BuycarComponent;
  let fixture: ComponentFixture<BuycarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuycarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuycarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
