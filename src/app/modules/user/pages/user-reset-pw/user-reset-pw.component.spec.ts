import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPwComponent } from './user-reset-pw.component';

describe('UserResetPwComponent', () => {
  let component: UserResetPwComponent;
  let fixture: ComponentFixture<UserResetPwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResetPwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
