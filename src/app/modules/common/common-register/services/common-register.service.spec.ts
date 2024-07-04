import { TestBed } from '@angular/core/testing';

import { CommonRegisterService } from './common-register.service';

describe('CommonRegisterService', () => {
  let service: CommonRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
