import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsSessionComponent } from './buttons-session.component';

describe('ButtonsSessionComponent', () => {
  let component: ButtonsSessionComponent;
  let fixture: ComponentFixture<ButtonsSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
