import { TestBed } from '@angular/core/testing';

import { IOServiceService } from './ioservice.service';

describe('IOServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IOServiceService = TestBed.get(IOServiceService);
    expect(service).toBeTruthy();
  });
});
