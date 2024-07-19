import { TestBed } from '@angular/core/testing';

import { CommonReferralLinkService } from './common-referral-link.service';

describe('CommonReferralLinkService', () => {
  let service: CommonReferralLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonReferralLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
