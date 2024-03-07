import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbuyInfosComponent } from './carbuy-infos.component';

describe('CarbuyInfosComponent', () => {
  let component: CarbuyInfosComponent;
  let fixture: ComponentFixture<CarbuyInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbuyInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarbuyInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
