import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarareaComponent } from './polararea.component';

describe('PolarareaComponent', () => {
  let component: PolarareaComponent;
  let fixture: ComponentFixture<PolarareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolarareaComponent]
    });
    fixture = TestBed.createComponent(PolarareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
