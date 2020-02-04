import { TestBed } from '@angular/core/testing';

import { ElectronAngularCommunicationService } from './electron-angular-communication.service';

describe('ElectronAngularCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronAngularCommunicationService = TestBed.get(ElectronAngularCommunicationService);
    expect(service).toBeTruthy();
  });
});
