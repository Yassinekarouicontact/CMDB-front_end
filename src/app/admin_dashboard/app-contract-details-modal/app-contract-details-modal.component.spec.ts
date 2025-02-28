import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppContractDetailsModalComponent } from "./app-contract-details-modal.component";

describe("AppContractDetailsModalComponent", () => {
  let component: AppContractDetailsModalComponent;
  let fixture: ComponentFixture<AppContractDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppContractDetailsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppContractDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
