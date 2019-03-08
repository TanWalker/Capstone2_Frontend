/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwimstylesComponent } from './swimstyles.component';

describe('SwimstylesComponent', () => {
  let component: SwimstylesComponent;
  let fixture: ComponentFixture<SwimstylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimstylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimstylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
