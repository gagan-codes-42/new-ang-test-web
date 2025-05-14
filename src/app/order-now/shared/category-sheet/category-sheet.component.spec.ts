import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySheetComponent } from './category-sheet.component';

describe('CategorySheetComponent', () => {
  let component: CategorySheetComponent;
  let fixture: ComponentFixture<CategorySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
