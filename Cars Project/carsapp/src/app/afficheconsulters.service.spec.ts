import { TestBed } from '@angular/core/testing';

import { AfficheconsultersService } from './afficheconsulters.service';

describe('AfficheconsultersService', () => {
  let service: AfficheconsultersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfficheconsultersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
