import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDisabledComponent } from './login-disabled.component';

describe('LoginDisabledComponent', () => {
  let component: LoginDisabledComponent;
  let fixture: ComponentFixture<LoginDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDisabledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
