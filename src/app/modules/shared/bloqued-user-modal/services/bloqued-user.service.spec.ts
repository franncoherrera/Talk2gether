import { TestBed } from '@angular/core/testing';

import { BloquedUserService } from './bloqued-user.service';

describe('BloquedUserService', () => {
  let service: BloquedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloquedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
