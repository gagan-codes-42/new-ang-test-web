import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAgainComponent } from './apply-again.component';

describe('ApplyAgainComponent', () => {
  let component: ApplyAgainComponent;
  let fixture: ComponentFixture<ApplyAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyAgainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
