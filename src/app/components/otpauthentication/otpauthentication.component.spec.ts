import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPAuthenticationComponent } from './otpauthentication.component';

describe('OTPAuthenticationComponent', () => {
  let component: OTPAuthenticationComponent;
  let fixture: ComponentFixture<OTPAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTPAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
