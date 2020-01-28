import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesModuleComponent } from './properties-module.component';

describe('PropertiesModuleComponent', () => {
  let component: PropertiesModuleComponent;
  let fixture: ComponentFixture<PropertiesModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
