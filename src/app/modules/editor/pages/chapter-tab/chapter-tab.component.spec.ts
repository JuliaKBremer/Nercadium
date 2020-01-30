import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterTabComponent } from './chapter-tab.component';

describe('ChapterTabComponent', () => {
  let component: ChapterTabComponent;
  let fixture: ComponentFixture<ChapterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
