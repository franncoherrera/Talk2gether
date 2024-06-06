import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHomePageComponent } from './common-home-page.component';

describe('CommonHomePageComponent', () => {
  let component: CommonHomePageComponent;
  let fixture: ComponentFixture<CommonHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
