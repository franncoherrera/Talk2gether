import { TestBed } from '@angular/core/testing';

import { CommonLoginService } from './common-login.service';

describe('CommonLoginService', () => {
  let service: CommonLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
