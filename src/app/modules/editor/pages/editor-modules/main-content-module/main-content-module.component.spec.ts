import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentModuleComponent } from './main-content-module.component';

describe('MainContentModuleComponent', () => {
  let component: MainContentModuleComponent;
  let fixture: ComponentFixture<MainContentModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
