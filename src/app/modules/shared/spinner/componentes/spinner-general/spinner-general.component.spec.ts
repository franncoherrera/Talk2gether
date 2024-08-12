import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerGeneralComponent } from './spinner-general.component';

describe('SpinnerGeneralComponent', () => {
  let component: SpinnerGeneralComponent;
  let fixture: ComponentFixture<SpinnerGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
