import { TestBed } from '@angular/core/testing';

import { SelectedMakeService } from './selected-make.service';

describe('SelectedMakeService', () => {
  let service: SelectedMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
