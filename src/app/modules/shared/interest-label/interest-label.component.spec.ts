import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestLabelComponent } from './interest-label.component';

describe('InterestLabelComponent', () => {
  let component: InterestLabelComponent;
  let fixture: ComponentFixture<InterestLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
