import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsWidgetComponent } from './blogs-widget.component';

describe('BlogsWidgetComponent', () => {
  let component: BlogsWidgetComponent;
  let fixture: ComponentFixture<BlogsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
