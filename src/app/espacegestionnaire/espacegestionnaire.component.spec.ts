import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacegestionnaireComponent } from './espacegestionnaire.component';

describe('EspacegestionnaireComponent', () => {
  let component: EspacegestionnaireComponent;
  let fixture: ComponentFixture<EspacegestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspacegestionnaireComponent]
    });
    fixture = TestBed.createComponent(EspacegestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
