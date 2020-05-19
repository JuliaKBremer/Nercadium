import { TestBed } from '@angular/core/testing';

import { ConfigManagerService } from './config-manager.service';

describe('ConfigManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigManagerService = TestBed.get(ConfigManagerService);
    expect(service).toBeTruthy();
  });
});
