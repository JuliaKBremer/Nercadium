import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOrganizerModuleComponent } from './content-organizer-module.component';

describe('ContentOrganizerModuleComponent', () => {
  let component: ContentOrganizerModuleComponent;
  let fixture: ComponentFixture<ContentOrganizerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentOrganizerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOrganizerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
