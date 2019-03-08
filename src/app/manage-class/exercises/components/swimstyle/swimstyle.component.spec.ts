/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwimstyleComponent } from './swimstyle.component';

describe('SwimstyleComponent', () => {
  let component: SwimstyleComponent;
  let fixture: ComponentFixture<SwimstyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimstyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
