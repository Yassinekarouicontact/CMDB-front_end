import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Equipement } from "app/model/equipement";
import { AdminService } from "app/_services/admin.service";
import { EquipementService } from "app/_services/equipement.service";
import { ToastrService } from "ngx-toastr";
import { forkJoin, Subject } from "rxjs";
import Swal from "sweetalert2";
import { error } from "jquery";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserModalComponent } from "app/admin_dashboard/app-user-modal/app-user-modal.component";
import { AppContractDetailsModalComponent } from "app/admin_dashboard/app-contract-details-modal/app-contract-details-modal.component";
import { Contract } from "app/model/contract";
import { ContractService } from "app/_services/contract.service";
import { AppUpdatedByDetailsModalComponent } from "app/admin_dashboard/app-updated-by-details-modal/app-updated-by-details-modal.component";

@Component({
  selector: "app-load-equipements",
  templateUrl: "./load-equipements.component.html",
  styleUrls: ["./load-equipements.component.scss"],
})
export class LoadEquipementsComponent implements OnInit {
  equipements: any[];
  filteredEquipements: any[];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  equipement: Equipement;
  createdBy: number;
  contract: Contract;
  searchEquipement: string;
  fileUrl: any;
  fileName: any;
  fileData: any;

  constructor(
    private equipementService: EquipementService,
    private router: Router,
    private adminService: AdminService,
    private modalService: NgbModal,
    private contractService: ContractService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: "full_numbers",
      searching: true,
      // paging: false,
      lengthChange: false,
      language: {
        searchPlaceholder: "Text Customer",
      },
    };
    this.LoadEquipements();
  }

  LoadEquipements() {
    this.equipementService.getEquipements().subscribe((res) => {
      this.equipements = res;
      this.filteredEquipements = res;
      this.dtTrigger.next(null);
      this.loadCreatedBy();
      this.loadLastUpdatedBy();
      this.loadContratReference();
    });
  }

  downloadFile(equipementId: number, fileName: string): void {
    this.equipementService
      .getEquipementFile(equipementId)
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
    const searchTerms = this.searchEquipement.toLowerCase().split(" ");
    this.filteredEquipements = this.equipements.filter((equipement) =>
      searchTerms.every(
        (term) =>
          equipement.serialNumber.toLowerCase().includes(term) ||
          equipement.localisation.toLowerCase().includes(term) ||
          equipement.host.toLowerCase().includes(term) ||
          equipement.image.toLowerCase().includes(term) ||
          equipement.ipAddress.toLowerCase().includes(term) ||
          equipement.model.toLowerCase().includes(term) ||
          equipement.constructer.toLowerCase().includes(term) ||
          equipement.actualOS.toLowerCase().includes(term) ||
          equipement.recolOS.toLowerCase().includes(term) ||
          equipement.productGroup.toLowerCase().includes(term)
      )
    );
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
  showContractDetails(contractId: number) {
    this.contractService.getContractById(contractId).subscribe((contract) => {
      this.openContractModal(contract);
    });
  }

  openContractModal(contract: Contract) {
    const modalRef = this.modalService.open(AppContractDetailsModalComponent);
    modalRef.componentInstance.contract = contract;
  }
  loadCreatedBy() {
    this.equipements.forEach((equipement) => {
      this.adminService
        .getUserInformations(equipement.createdBy.userId)
        .subscribe((res) => {
          equipement.createdBy.userName = res.firstName + " " + res.lastName;
          equipement.createdBy.dateName = equipement.createdBy.date
            .toString()
            .slice(0, 19)
            .replace("T", " at ");
        });
    });
  }

  loadLastUpdatedBy() {
    this.equipements.forEach((equipement) => {
      if (equipement.updatedBy.length == 0) {
        equipement.lastUpdate = null;
      } else {
        const lastIndex = equipement.updatedBy.length - 1;
        equipement.lastUpdate = equipement.updatedBy[lastIndex];
        this.adminService
          .getUserInformations(equipement.lastUpdate.userId)
          .subscribe((user) => {
            equipement.lastUpdate.userName =
              user.firstName + " " + user.lastName;
            equipement.lastUpdate.dateName = equipement.lastUpdate.date
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

  loadContratReference() {
    this.equipements.forEach((equipement) => {
      this.contractService
        .getContractById(equipement.contratId)
        .subscribe((res) => {
          console.log("res please: " + res.reference);

          equipement.contratReference = res.reference;
        });
    });
  }
  removeEquipement(equipement: Equipement) {
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
        title: "Delete Equipement",
        text:
          "Are you sure you want to delete equipement with serial number " +
          equipement.serialNumber +
          " ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.equipementService.deleteEquipementById(equipement.id).subscribe(
            (res) => {
              this.LoadEquipements();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Equipement has been deleted.",
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

  EditEquipement(equipement: Equipement) {
    this.router.navigate(["admin/equipements/update/" + equipement.id], {
      state: { myObject: equipement },
    });
  }
}
