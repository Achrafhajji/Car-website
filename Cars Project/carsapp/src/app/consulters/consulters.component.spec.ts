import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultersComponent } from './consulters.component';

describe('ConsultersComponent', () => {
  let component: ConsultersComponent;
  let fixture: ComponentFixture<ConsultersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
