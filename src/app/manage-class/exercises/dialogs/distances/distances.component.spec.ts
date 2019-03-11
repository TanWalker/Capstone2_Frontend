/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DistancesComponent } from './distances.component';

describe('DistanceComponent', () => {
  let component: DistancesComponent;
  let fixture: ComponentFixture<DistancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
