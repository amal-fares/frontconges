import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypemotifComponent } from './typemotif.component';

describe('TypemotifComponent', () => {
  let component: TypemotifComponent;
  let fixture: ComponentFixture<TypemotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypemotifComponent]
    });
    fixture = TestBed.createComponent(TypemotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
