/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StyleRankComponent } from './style-rank.component';

describe('StyleRankComponent', () => {
  let component: StyleRankComponent;
  let fixture: ComponentFixture<StyleRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
