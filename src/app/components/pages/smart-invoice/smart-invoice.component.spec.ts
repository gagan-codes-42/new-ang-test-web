import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartInvoiceComponent } from './smart-invoice.component';

describe('SmartInvoiceComponent', () => {
  let component: SmartInvoiceComponent;
  let fixture: ComponentFixture<SmartInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
