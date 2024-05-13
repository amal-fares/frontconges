import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidpremComponent } from './validprem.component';

describe('ValidpremComponent', () => {
  let component: ValidpremComponent;
  let fixture: ComponentFixture<ValidpremComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidpremComponent]
    });
    fixture = TestBed.createComponent(ValidpremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
