import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHotkeysComponent } from './editor-hotkeys.component';

describe('EditorHotkeysComponent', () => {
  let component: EditorHotkeysComponent;
  let fixture: ComponentFixture<EditorHotkeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorHotkeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHotkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
