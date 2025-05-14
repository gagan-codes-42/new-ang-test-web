import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfDialogComponent } from './order-conf-dialog.component';

describe('OrderConfDialogComponent', () => {
  let component: OrderConfDialogComponent;
  let fixture: ComponentFixture<OrderConfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
