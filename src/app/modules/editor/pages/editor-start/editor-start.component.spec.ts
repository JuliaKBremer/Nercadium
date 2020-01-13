import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorStartComponent } from './editor-start.component';

describe('EditorStartComponent', () => {
  let component: EditorStartComponent;
  let fixture: ComponentFixture<EditorStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
