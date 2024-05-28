import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MondossiernumeriqueComponent } from './mondossiernumerique.component';

describe('MondossiernumeriqueComponent', () => {
  let component: MondossiernumeriqueComponent;
  let fixture: ComponentFixture<MondossiernumeriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MondossiernumeriqueComponent]
    });
    fixture = TestBed.createComponent(MondossiernumeriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
