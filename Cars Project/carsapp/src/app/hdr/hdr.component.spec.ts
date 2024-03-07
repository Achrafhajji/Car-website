import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdrComponent } from './hdr.component';

describe('HdrComponent', () => {
  let component: HdrComponent;
  let fixture: ComponentFixture<HdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
