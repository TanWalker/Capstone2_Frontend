/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManageRecordService } from './manageRecord.service';

describe('Service: ManageRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageRecordService]
    });
  });

  it('should ...', inject([ManageRecordService], (service: ManageRecordService) => {
    expect(service).toBeTruthy();
  }));
});
