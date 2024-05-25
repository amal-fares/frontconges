import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetardsComponent } from './retards.component';

describe('RetardsComponent', () => {
  let component: RetardsComponent;
  let fixture: ComponentFixture<RetardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetardsComponent]
    });
    fixture = TestBed.createComponent(RetardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
