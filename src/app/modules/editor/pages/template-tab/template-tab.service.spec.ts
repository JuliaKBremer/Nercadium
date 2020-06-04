import { TestBed } from '@angular/core/testing';

import { TemplateTabService } from './template-tab.service';

describe('TemplateTapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateTabService = TestBed.get(TemplateTabService);
    expect(service).toBeTruthy();
  });
});
