import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdatedByDetailsModalComponent } from './app-updated-by-details-modal.component';

describe('AppUpdatedByDetailsModalComponent', () => {
  let component: AppUpdatedByDetailsModalComponent;
  let fixture: ComponentFixture<AppUpdatedByDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUpdatedByDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdatedByDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
