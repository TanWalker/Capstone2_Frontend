/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordByMonthYearComponent } from './record-by-month-year.component';

describe('RecordByMonthYearComponent', () => {
  let component: RecordByMonthYearComponent;
  let fixture: ComponentFixture<RecordByMonthYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordByMonthYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordByMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
