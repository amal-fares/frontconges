import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcodeComponent } from './sendcode.component';

describe('SendcodeComponent', () => {
  let component: SendcodeComponent;
  let fixture: ComponentFixture<SendcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendcodeComponent]
    });
    fixture = TestBed.createComponent(SendcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
