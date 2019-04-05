import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordByMonthYearExComponent } from './record-by-month-year-ex.component';

describe('RecordByMonthYearExComponent', () => {
  let component: RecordByMonthYearExComponent;
  let fixture: ComponentFixture<RecordByMonthYearExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordByMonthYearExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordByMonthYearExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
