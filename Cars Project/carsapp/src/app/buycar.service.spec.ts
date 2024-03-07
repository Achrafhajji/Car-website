import { TestBed } from '@angular/core/testing';

import { BuycarService } from './buycar.service';

describe('BuycarService', () => {
  let service: BuycarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuycarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
