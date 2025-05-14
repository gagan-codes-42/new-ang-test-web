import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCustOtpComponent } from './reg-cust-otp.component';

describe('RegCustOtpComponent', () => {
  let component: RegCustOtpComponent;
  let fixture: ComponentFixture<RegCustOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegCustOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCustOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
