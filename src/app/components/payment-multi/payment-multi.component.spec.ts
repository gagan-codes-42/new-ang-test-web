import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMultiComponent } from './payment-multi.component';

describe('PaymentMultiComponent', () => {
  let component: PaymentMultiComponent;
  let fixture: ComponentFixture<PaymentMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
