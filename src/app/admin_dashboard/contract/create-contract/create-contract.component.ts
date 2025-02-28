import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Contract } from "app/model/contract";
import { EquipementService } from "app/_services/equipement.service";
import { AdminService } from "app/_services/admin.service";
import { TokenStorageService } from "app/_services/token-storage.service";
import { ContractService } from "app/_services/contract.service";
import { UserInformations } from "app/model/user.model";
import { MatDialog } from "@angular/material/dialog";
import { CreateEquipementComponent } from "app/admin_dashboard/equipement/create-equipement/create-equipement.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductGroup } from "app/model/ProductGroup.enum";
import { Equipement } from "app/model/equipement";
import { AppCreateEquipementModalComponent } from "app/admin_dashboard/app-create-equipement-modal/app-create-equipement-modal.component";

@Component({
  selector: "app-create-contract",
  templateUrl: "./create-contract.component.html",
  styleUrls: ["./create-contract.component.css"],
})
export class CreateContractComponent implements OnInit {
  contract: Contract = {};
  equipements: Equipement[] = [];
  clients: UserInformations[] = [];
  userId: number;
  createdEquipment: Equipement;
  @ViewChild("contractForm") contractForm: NgForm;
  currentDateTime = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  productGroup = Object.values(ProductGroup);
  createdEquipmentSerialNumber: string;
  file: File;

  constructor(
    private equipementService: EquipementService,
    private adminService: AdminService,
    private tokenService: TokenStorageService,
    private router: Router,
    private datepipe: DatePipe,
    private contractService: ContractService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.contract.equipementsID = [];
    this.adminService.getAllClients().subscribe((res) => {
      console.log("Clients:", res);
      this.clients = res;
    });
  }

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }
  onSubmit() {
    if (this.file) {
      this.contractService
        .addContract(this.file, this.contract, this.userId)
        .subscribe((res) => {
          if (res !== null) {
            this.router.navigate(["admin/contracts/load"]);
          }
        });
    }
  }
  openCreateEquipementModal() {
    const modalRef = this.modalService.open(AppCreateEquipementModalComponent, {
      size: "lg",
      centered: true,
    });
    modalRef.componentInstance.equipmentCreated.subscribe((equipement) => {
      console.log("l'equipement li khraj mel create equi: " + equipement.id);

      this.equipements.push(equipement);
      this.contract.equipementsID.push(equipement.id);
      console.log("TESSST EQUIPEMENTS" + this.contract.equipementsID.length);

      this.modalService.dismissAll({ serialNumber: equipement.serialNumber });
    });
  }

  deleteEquipment(equipmentId: number): void {
    this.equipementService.deleteEquipementById(equipmentId).subscribe(
      () => {
        // Remove the deleted equipment from the display
        this.equipements = this.equipements.filter(
          (equipement) => equipement.id !== equipmentId
        );
      },
      (error) => {
        // Handle error
      }
    );
  }
}
