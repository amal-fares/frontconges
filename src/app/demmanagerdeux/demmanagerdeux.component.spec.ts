import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemmanagerdeuxComponent } from './demmanagerdeux.component';

describe('DemmanagerdeuxComponent', () => {
  let component: DemmanagerdeuxComponent;
  let fixture: ComponentFixture<DemmanagerdeuxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemmanagerdeuxComponent]
    });
    fixture = TestBed.createComponent(DemmanagerdeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
