import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfigurationComponent } from './show-configuration.component';

describe('ShowConfigurationComponent', () => {
  let component: ShowConfigurationComponent;
  let fixture: ComponentFixture<ShowConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
