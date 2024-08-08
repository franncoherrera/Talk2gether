import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditConfigurationComponent } from './account-edit-configuration.component';

describe('AccountEditConfigurationComponent', () => {
  let component: AccountEditConfigurationComponent;
  let fixture: ComponentFixture<AccountEditConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
