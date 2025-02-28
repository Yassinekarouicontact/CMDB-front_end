import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "app/_services/admin.service";
import { ContractService } from "app/_services/contract.service";
import { EquipementService } from "app/_services/equipement.service";
import { Contract } from "app/model/contract";
import { UserInformations } from "app/model/user.model";
import { Subject, forkJoin } from "rxjs";
import Swal from "sweetalert2";
import { Equipement } from "app/model/equipement";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserModalComponent } from "app/admin_dashboard/app-user-modal/app-user-modal.component";
import { EquipmentDetailsModalComponent } from "app/admin_dashboard/app-equipment-details-modal/app-equipment-details-modal.component";
import { AppUpdatedByDetailsModalComponent } from "app/admin_dashboard/app-updated-by-details-modal/app-updated-by-details-modal.component";

@Component({
  selector: "app-retreive-contract",
  templateUrl: "./retreive-contract.component.html",
  styleUrls: ["./retreive-contract.component.scss"],
})
export class RetreiveContractComponent implements OnInit {
  contracts: Contract[];
  equipementsID?: string[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  contract: Contract;
  createdBy: number;
  users: UserInformations;
  selectedEquipementIds: number[] = [];
  filteredContracts: Contract[];
  searchContract: string;
  updatedByName: string[] = [];
  contractEquipements: Equipement[] = [];
  fileUrl: any;
  fileName: any;
  fileData: any;

  constructor(
    private contractService: ContractService,
    private router: Router,
    private adminService: AdminService,
    private equipementService: EquipementService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: "full_numbers",
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: "Text Customer",
      },
    };
    this.RetreiveContracts();
  }

  RetreiveContracts() {
    this.contractService.getContracts().subscribe((res) => {
      this.contracts = res;
      this.filteredContracts = res;
      this.dtTrigger.next(null);
      this.loadCreatedBy();
      this.loadLastUpdatedBy();
      this.getEquipementsForContracts();
    });
  }

  downloadFile(contractId: number, fileName: string): void {
    this.contractService
      .getContractFile(contractId)
      .subscribe((data: Blob) => {
        const blob = new Blob([data], { type: data.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      });
  }

  onSearch() {
    const searchTerms = this.searchContract.toLowerCase().split(" ");

    this.filteredContracts = this.contracts.filter((contract) =>
      searchTerms.every(
        (term) =>
          contract.id.toString().toLowerCase().includes(term) ||
          contract.reference.toLowerCase().includes(term) ||
          contract.contractType.toLowerCase().includes(term) ||
          contract.risingAmount.toString().toLowerCase().includes(term) ||
          contract.equipementsID.some((id) =>
            this.contractEquipements
              .find((e) => e.id === id)
              .serialNumber.toLowerCase()
              .includes(term)
          ) ||
          (contract.clientFirstName + " " + contract.clientLastName)
            .toLowerCase()
            .includes(term)
      )
    );
  }

  loadCreatedBy() {
    this.contracts.forEach((contract) => {
      this.adminService
        .getUserInformations(contract.createdBy.userId)
        .subscribe((res) => {
          contract.createdBy.userName = res.firstName + " " + res.lastName;
          contract.createdBy.dateName = contract.createdBy.date
            .toString()
            .slice(0, 19)
            .replace("T", " at ");
        });
      this.adminService.getUserInformations(contract.clientID).subscribe(
        (res) => {
          contract.clientFirstName = res.firstName;
          contract.clientLastName = res.lastName;
        },
        (error) => console.log(error)
      );
    });
  }

  loadLastUpdatedBy() {
    this.contracts.forEach((contract) => {
      if (contract.updatedBy.length == 0) {
        contract.lastUpdate = null;
      } else {
        const lastIndex = contract.updatedBy.length - 1;
        contract.lastUpdate = contract.updatedBy[lastIndex];
        this.adminService
          .getUserInformations(contract.lastUpdate.userId)
          .subscribe((user) => {
            contract.lastUpdate.userName = user.firstName + " " + user.lastName;
            contract.lastUpdate.dateName = contract.lastUpdate.date
              .toString()
              .slice(0, 19)
              .replace("T", " at ");
          });
      }
    });
  }

  loadUpdatedBy(equipement: any) {
    // Assuming equipement.updatedBy is of type unknown[]
    const updatedByArray = equipement.updatedBy as any[];
    const getUserInfoObservables = updatedByArray.map((res) => {
      return this.adminService.getUserInformations(res.userId);
    });
    forkJoin(getUserInfoObservables).subscribe((userInfos) => {
      userInfos.forEach((user, index) => {
        const res = updatedByArray[index];
        res.userName = user.firstName + " " + user.lastName;
        res.dateName = res.date.toString().slice(0, 19).replace("T", " at ");
      });
      const modalRef = this.modalService.open(
        AppUpdatedByDetailsModalComponent
      );
      modalRef.componentInstance.updateBy = updatedByArray;
      console.log(updatedByArray);
    });
  }
  getEquipementsForContracts() {
    this.contractEquipements = [];
    for (let i = 0; i < this.contracts.length; i++) {
      const equipementIds = this.contracts[i].equipementsID;
      for (let j = 0; j < equipementIds.length; j++) {
        this.equipementService
          .getEquipementById(equipementIds[j])
          .subscribe((equipement) => {
            if (!this.contractEquipements.find((e) => e.id === equipement.id)) {
              this.contractEquipements.push(equipement);
            }
          });
      }
    }
  }

  showUserInformation(userId: number) {
    this.adminService.getUserInformations(userId).subscribe((user) => {
      const modalRef = this.modalService.open(UserModalComponent, {
        size: "lg",
        centered: true,
      });
      modalRef.componentInstance.user = user;
    });
  }
  showEquipmentDetails(equipementId: number) {
    this.equipementService
      .getEquipementById(equipementId)
      .subscribe((equipement) => {
        this.openEquipmentModal(equipement);
      });
  }

  openEquipmentModal(equipement: Equipement) {
    console.log(equipement);

    const modalRef = this.modalService.open(EquipmentDetailsModalComponent);
    modalRef.componentInstance.equipement = equipement;
  }

  removeContract(contract: Contract) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0d6efd",
        title: "Delete Contract",
        text:
          "Are you sure you want to delete contract with id " +
          contract.id +
          " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.contractService.deleteContractById(contract.id).subscribe(
            (res) => {
              this.RetreiveContracts();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Contract has been deleted.",
                "success"
              );
            },
            (error) => {
              swalWithBootstrapButtons.fire(
                "Failed!",
                "failed to delete equipement.",
                "error"
              );
            }
          );
        }
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // unsubscribe from other subscriptions here
  }
  EditContract(contract: Contract) {
    this.router.navigate(["admin/contracts/update/" + contract.id], {
      state: { myObject: contract },
    });
  }
}
