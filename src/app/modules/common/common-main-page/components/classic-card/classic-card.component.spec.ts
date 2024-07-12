import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicCardComponent } from './classic-card.component';

describe('ClassicCardComponent', () => {
  let component: ClassicCardComponent;
  let fixture: ComponentFixture<ClassicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
