/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManageLessonPlanService } from './manageLessonPlan.service';

describe('Service: ManageLessonPlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageLessonPlanService]
    });
  });

  it('should ...', inject([ManageLessonPlanService], (service: ManageLessonPlanService) => {
    expect(service).toBeTruthy();
  }));
});
