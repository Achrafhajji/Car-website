import { TestBed } from '@angular/core/testing';

import { AffichenewsService } from './affichenews.service';

describe('AffichenewsService', () => {
  let service: AffichenewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffichenewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
