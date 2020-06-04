import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTabComponent } from './template-tab.component';

describe('TemplateTabComponent', () => {
  let component: TemplateTabComponent;
  let fixture: ComponentFixture<TemplateTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
