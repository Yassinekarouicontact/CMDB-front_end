import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailsModalComponent } from './app-equipment-details-modal.component';

describe('AppEquipmentDetailsModalComponent', () => {
  let component: EquipmentDetailsModalComponent;
  let fixture: ComponentFixture<EquipmentDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
