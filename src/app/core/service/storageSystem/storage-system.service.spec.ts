import { TestBed } from '@angular/core/testing';

import { StorageSystemService } from './storage-system.service';

describe('StorageSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageSystemService = TestBed.get(StorageSystemService);
    expect(service).toBeTruthy();
  });
});
