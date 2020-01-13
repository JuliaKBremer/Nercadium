import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStartComponent } from './store-start.component';

describe('StoreStartComponent', () => {
  let component: StoreStartComponent;
  let fixture: ComponentFixture<StoreStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
