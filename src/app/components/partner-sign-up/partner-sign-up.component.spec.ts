import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSignUpComponent } from './partner-sign-up.component';

describe('PartnerSignUpComponent', () => {
  let component: PartnerSignUpComponent;
  let fixture: ComponentFixture<PartnerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
