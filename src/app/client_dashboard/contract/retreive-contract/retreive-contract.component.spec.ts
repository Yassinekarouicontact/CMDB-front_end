import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RetreiveContractComponent } from "./retreive-contract.component";

describe("RetreiveContractComponent", () => {
  let component: RetreiveContractComponent;
  let fixture: ComponentFixture<RetreiveContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetreiveContractComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetreiveContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
