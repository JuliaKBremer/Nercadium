import { TestBed } from '@angular/core/testing';

import { ObjectTabService } from './object-tab.service';

describe('ObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectTabService = TestBed.get(ObjectTabService);
    expect(service).toBeTruthy();
  });
});
