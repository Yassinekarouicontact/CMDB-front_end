import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCreateEquipementModalComponent } from './app-create-equipement-modal.component';

describe('AppCreateEquipementModalComponent', () => {
  let component: AppCreateEquipementModalComponent;
  let fixture: ComponentFixture<AppCreateEquipementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCreateEquipementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCreateEquipementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
