import { TestBed } from '@angular/core/testing';

import { AfficheadvicesService } from './afficheadvices.service';

describe('AfficheadvicesService', () => {
  let service: AfficheadvicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfficheadvicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
