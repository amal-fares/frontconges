import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddemandecongesComponent } from './adddemandeconges.component';

describe('AdddemandecongesComponent', () => {
  let component: AdddemandecongesComponent;
  let fixture: ComponentFixture<AdddemandecongesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddemandecongesComponent]
    });
    fixture = TestBed.createComponent(AdddemandecongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
