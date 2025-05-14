import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicateOrderComponent } from './replicate-order.component';

describe('ReplicateOrderComponent', () => {
  let component: ReplicateOrderComponent;
  let fixture: ComponentFixture<ReplicateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplicateOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplicateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
