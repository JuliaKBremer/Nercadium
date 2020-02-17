import { TestBed } from '@angular/core/testing';

import { DBLocalServiceService } from './dblocal-service.service';

describe('DBLocalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBLocalServiceService = TestBed.get(DBLocalServiceService);
    expect(service).toBeTruthy();
  });
});
