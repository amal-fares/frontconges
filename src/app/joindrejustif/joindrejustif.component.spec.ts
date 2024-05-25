import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoindrejustifComponent } from './joindrejustif.component';

describe('JoindrejustifComponent', () => {
  let component: JoindrejustifComponent;
  let fixture: ComponentFixture<JoindrejustifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoindrejustifComponent]
    });
    fixture = TestBed.createComponent(JoindrejustifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
