import { TestBed } from '@angular/core/testing';

import { CarselectedService } from './carselected.service';

describe('CarselectedService', () => {
  let service: CarselectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarselectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
