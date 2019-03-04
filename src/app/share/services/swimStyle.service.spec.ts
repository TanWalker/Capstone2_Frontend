/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwimStyleService } from './swimStyle.service';

describe('Service: SwimStyle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwimStyleService]
    });
  });

  it('should ...', inject([SwimStyleService], (service: SwimStyleService) => {
    expect(service).toBeTruthy();
  }));
});
