import { TestBed } from '@angular/core/testing';

import { AdventuresManagerService } from './adventures-manager.service';

describe('ProjectsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdventuresManagerService = TestBed.get(AdventuresManagerService);
    expect(service).toBeTruthy();
  });
});
