import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SognutchartComponent } from './sognutchart.component';

describe('SognutchartComponent', () => {
  let component: SognutchartComponent;
  let fixture: ComponentFixture<SognutchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SognutchartComponent]
    });
    fixture = TestBed.createComponent(SognutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
