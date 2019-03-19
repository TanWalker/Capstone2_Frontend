/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedBackService } from './feedBack.service';

describe('Service: FeedBack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedBackService]
    });
  });

  it('should ...', inject([FeedBackService], (service: FeedBackService) => {
    expect(service).toBeTruthy();
  }));
});
