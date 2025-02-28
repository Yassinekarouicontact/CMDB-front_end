import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserModalComponent } from './app-user-modal.component';

describe('AppUserModalComponent', () => {
  let component: AppUserModalComponent;
  let fixture: ComponentFixture<AppUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
