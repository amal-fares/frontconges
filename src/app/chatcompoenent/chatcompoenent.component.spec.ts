import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatcompoenentComponent } from './chatcompoenent.component';

describe('ChatcompoenentComponent', () => {
  let component: ChatcompoenentComponent;
  let fixture: ComponentFixture<ChatcompoenentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatcompoenentComponent]
    });
    fixture = TestBed.createComponent(ChatcompoenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
