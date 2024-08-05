import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePersonalAccountComponent } from './delete-personal-account.component';

describe('DeletePersonalAccountComponent', () => {
  let component: DeletePersonalAccountComponent;
  let fixture: ComponentFixture<DeletePersonalAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePersonalAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePersonalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
