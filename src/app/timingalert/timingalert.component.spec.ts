import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingalertComponent } from './timingalert.component';

describe('TimingalertComponent', () => {
  let component: TimingalertComponent;
  let fixture: ComponentFixture<TimingalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimingalertComponent]
    });
    fixture = TestBed.createComponent(TimingalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
