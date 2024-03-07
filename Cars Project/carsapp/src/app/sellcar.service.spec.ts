import { TestBed } from '@angular/core/testing';

import { SellcarService } from './sellcar.service';

describe('SellcarService', () => {
  let service: SellcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
