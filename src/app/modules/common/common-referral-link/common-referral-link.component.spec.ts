import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonReferralLinkComponent } from './common-referral-link.component';

describe('CommonReferralLinkComponent', () => {
  let component: CommonReferralLinkComponent;
  let fixture: ComponentFixture<CommonReferralLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonReferralLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonReferralLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
