import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerParticularComponent } from './spinner-particular.component';

describe('SpinnerParticularComponent', () => {
  let component: SpinnerParticularComponent;
  let fixture: ComponentFixture<SpinnerParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerParticularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
