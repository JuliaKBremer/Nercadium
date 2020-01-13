import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryStartComponent } from './library-start.component';

describe('LibraryStartComponent', () => {
  let component: LibraryStartComponent;
  let fixture: ComponentFixture<LibraryStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
