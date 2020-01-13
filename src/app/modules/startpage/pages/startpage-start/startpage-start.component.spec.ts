import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartpageStartComponent } from './startpage-start.component';

describe('StartpageStartComponent', () => {
  let component: StartpageStartComponent;
  let fixture: ComponentFixture<StartpageStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartpageStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartpageStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
