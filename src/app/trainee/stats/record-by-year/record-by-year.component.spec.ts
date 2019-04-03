/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordByYearComponent } from './record-by-year.component';

describe('RecordByYearComponent', () => {
  let component: RecordByYearComponent;
  let fixture: ComponentFixture<RecordByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
