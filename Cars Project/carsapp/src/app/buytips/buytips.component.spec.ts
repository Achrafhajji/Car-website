import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytipsComponent } from './buytips.component';

describe('BuytipsComponent', () => {
  let component: BuytipsComponent;
  let fixture: ComponentFixture<BuytipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuytipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuytipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
