import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharttopvalidationComponent } from './charttopvalidation.component';

describe('CharttopvalidationComponent', () => {
  let component: CharttopvalidationComponent;
  let fixture: ComponentFixture<CharttopvalidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharttopvalidationComponent]
    });
    fixture = TestBed.createComponent(CharttopvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
