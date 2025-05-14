import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomHeaderComponent } from './dashboard-custom-header.component';

describe('DashboardCustomHeaderComponent', () => {
  let component: DashboardCustomHeaderComponent;
  let fixture: ComponentFixture<DashboardCustomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCustomHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCustomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
