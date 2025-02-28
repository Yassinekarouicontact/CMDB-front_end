import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoadEquipementsComponent } from "./load-equipements.component";

describe("LoadEquipementsComponent", () => {
  let component: LoadEquipementsComponent;
  let fixture: ComponentFixture<LoadEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadEquipementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
