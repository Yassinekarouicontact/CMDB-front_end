import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { Equipement } from "app/model/equipement";
import { EquipementService } from "app/_services/equipement.service";
import { Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "app/_services/admin.service";
import { UserModalComponent } from "../app-user-modal/app-user-modal.component";
import { ContractService } from "app/_services/contract.service";
@Component({
  selector: "app-app-equipment-details-modal",
  templateUrl: "./app-equipment-details-modal.component.html",
  styleUrls: ["./app-equipment-details-modal.component.css"],
})
export class EquipmentDetailsModalComponent implements OnInit {
  @Input() equipement: any;
  constructor(
    public modal: NgbActiveModal,
    private adminService: AdminService,
    private contratService: ContractService
  ) {}
  ngOnInit(): void {
    this.adminService
      .getUserInformations(this.equipement.createdBy.userId)
      .subscribe((res) => {
        this.equipement.createdBy.userName = res.firstName + " " + res.lastName;
        this.equipement.createdBy.dateName = this.equipement.createdBy.date
          .toString()
          .slice(0, 19)
          .replace("T", " at ");
      });
    if (this.equipement.updatedBy.length == 0) {
      this.equipement.lastUpdate = null;
    } else {
      const lastIndex = this.equipement.updatedBy.length - 1;
      this.equipement.lastUpdate = this.equipement.updatedBy[lastIndex];
      this.adminService
        .getUserInformations(this.equipement.lastUpdate.userId)
        .subscribe((user) => {
          this.equipement.lastUpdate.userName =
            user.firstName + " " + user.lastName;
          this.equipement.lastUpdate.dateName = this.equipement.lastUpdate.date
            .toString()
            .slice(0, 19)
            .replace("T", " at ");
        });
    }

    this.contratService
      .getContractById(this.equipement.contratId)
      .subscribe((res) => {
        this.equipement.contratReference = res.reference;
      });
  }
}
