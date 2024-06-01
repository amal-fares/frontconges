import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagejustifgestComponent } from './imagejustifgest.component';

describe('ImagejustifgestComponent', () => {
  let component: ImagejustifgestComponent;
  let fixture: ComponentFixture<ImagejustifgestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagejustifgestComponent]
    });
    fixture = TestBed.createComponent(ImagejustifgestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
