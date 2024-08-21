import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileViewComponent } from './main-profile-view.component';

describe('MainProfileViewComponent', () => {
  let component: MainProfileViewComponent;
  let fixture: ComponentFixture<MainProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainProfileViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
