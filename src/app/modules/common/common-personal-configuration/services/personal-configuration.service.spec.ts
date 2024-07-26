import { TestBed } from '@angular/core/testing';

import { PersonalConfigurationService } from './personal-configuration.service';

describe('PersonalConfigurationService', () => {
  let service: PersonalConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
