import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageLevelModalComponent } from './language-level-modal.component';

describe('LanguageLevelModalComponent', () => {
  let component: LanguageLevelModalComponent;
  let fixture: ComponentFixture<LanguageLevelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageLevelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageLevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
