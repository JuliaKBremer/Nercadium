import { TestBed } from '@angular/core/testing';

import { MinMaxCloseService } from './min-max-close.service';

describe('MinMaxCloseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinMaxCloseService = TestBed.get(MinMaxCloseService);
    expect(service).toBeTruthy();
  });
});
