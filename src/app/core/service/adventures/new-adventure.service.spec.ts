import { TestBed } from '@angular/core/testing';

import { NewAdventureService } from './new-adventure.service';

describe('NewAdventureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAdventureService = TestBed.get(NewAdventureService);
    expect(service).toBeTruthy();
  });
});
