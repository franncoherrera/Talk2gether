import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquedUserModalComponent } from './bloqued-user-modal.component';

describe('BloquedUserModalComponent', () => {
  let component: BloquedUserModalComponent;
  let fixture: ComponentFixture<BloquedUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloquedUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloquedUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
