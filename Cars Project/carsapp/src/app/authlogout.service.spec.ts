import { TestBed } from '@angular/core/testing';

import { AuthlogoutService } from './authlogout.service';

describe('AuthlogoutService', () => {
  let service: AuthlogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthlogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
