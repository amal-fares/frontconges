import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandestotalComponent } from './demandestotal.component';

describe('DemandestotalComponent', () => {
  let component: DemandestotalComponent;
  let fixture: ComponentFixture<DemandestotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandestotalComponent]
    });
    fixture = TestBed.createComponent(DemandestotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
