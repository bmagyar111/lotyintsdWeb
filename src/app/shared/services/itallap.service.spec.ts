import { TestBed } from '@angular/core/testing';

import { ItallapService } from './itallap.service';

describe('ItallapService', () => {
  let service: ItallapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItallapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
