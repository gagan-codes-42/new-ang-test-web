import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcceptedComponent } from './form-accepted.component';

describe('FormAcceptedComponent', () => {
  let component: FormAcceptedComponent;
  let fixture: ComponentFixture<FormAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
