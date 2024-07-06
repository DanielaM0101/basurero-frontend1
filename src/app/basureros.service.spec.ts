import { TestBed } from '@angular/core/testing';

import { BasurerosService } from './basureros.service';

describe('BasurerosService', () => {
  let service: BasurerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasurerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
