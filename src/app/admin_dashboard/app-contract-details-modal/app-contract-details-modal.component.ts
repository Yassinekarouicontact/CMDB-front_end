import { Input, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminService } from "app/_services/admin.service";

@Component({
  selector: "app-app-contract-details-modal",
  templateUrl: "./app-contract-details-modal.component.html",
  styleUrls: ["./app-contract-details-modal.component.css"],
})
export class AppContractDetailsModalComponent implements OnInit {
  @Input() contract: any;
  constructor(
    public modal: NgbActiveModal,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getUserInformations(this.contract.createdBy.userId)
      .subscribe((res) => {
        this.contract.createdBy.userName = res.firstName + " " + res.lastName;
        this.contract.createdBy.dateName = this.contract.createdBy.date
          .toString()
          .slice(0, 19)
          .replace("T", " at ");
      });

    if (this.contract.updatedBy.length == 0) {
      this.contract.lastUpdate = null;
    } else {
      const lastIndex = this.contract.updatedBy.length - 1;
      this.contract.lastUpdate = this.contract.updatedBy[lastIndex];
      this.adminService
        .getUserInformations(this.contract.lastUpdate.userId)
        .subscribe((user) => {
          this.contract.lastUpdate.userName =
            user.firstName + " " + user.lastName;
          this.contract.lastUpdate.dateName = this.contract.lastUpdate.date
            .toString()
            .slice(0, 19)
            .replace("T", " at ");
        });
    }

    this.adminService.getUserInformations(this.contract.clientID).subscribe(
      (res) => {
        this.contract.clientFirstName = res.firstName;
        this.contract.clientLastName = res.lastName;
      },
      (error) => console.log(error)
    );
  }
}
