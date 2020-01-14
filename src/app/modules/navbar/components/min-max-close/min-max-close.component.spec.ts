import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxCloseComponent } from './min-max-close.component';

describe('MinMaxCloseComponent', () => {
  let component: MinMaxCloseComponent;
  let fixture: ComponentFixture<MinMaxCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinMaxCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
