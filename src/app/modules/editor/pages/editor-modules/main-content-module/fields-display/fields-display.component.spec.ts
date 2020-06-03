import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsDisplayComponent } from './fields-display.component';

describe('FieldsDisplayComponent', () => {
  let component: FieldsDisplayComponent;
  let fixture: ComponentFixture<FieldsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
