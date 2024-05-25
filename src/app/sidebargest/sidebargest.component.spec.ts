import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebargestComponent } from './sidebargest.component';

describe('SidebargestComponent', () => {
  let component: SidebargestComponent;
  let fixture: ComponentFixture<SidebargestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebargestComponent]
    });
    fixture = TestBed.createComponent(SidebargestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
