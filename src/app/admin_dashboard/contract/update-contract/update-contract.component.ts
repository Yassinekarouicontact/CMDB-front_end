import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ContractService } from "app/_services/contract.service";
import { Contract } from "app/model/contract";
import { DatePipe } from "@angular/common";
import { UserInformations } from "app/model/user.model";
import { EquipementService } from "app/_services/equipement.service";
import { AdminService } from "app/_services/admin.service";
import { TokenStorageService } from "app/_services/token-storage.service";

@Component({
  selector: "app-update-contract",
  templateUrl: "./update-contract.component.html",
  styleUrls: ["./update-contract.component.css"],
})
export class UpdateContractComponent implements OnInit {
  contract: any = {};
  contractForm: FormGroup;
  contratId: any;
  createdBy: number;
  userId: number;
  equipements: any[] = [];
  clients: UserInformations[] = [];
  currentDateTime = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  updatedBy: any[];
  file: File;

  constructor(
    private contractService: ContractService,
    private equipementService: EquipementService,
    private tokenService: TokenStorageService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.contratId = this.route.snapshot.paramMap.get("id");
    this.contract = history.state.myObject;

    this.equipementService.getEquipements().subscribe((res) => {
      this.equipements = res;
    });

    this.adminService.getAllClients().subscribe((res) => {
      this.clients = res;
    });

    this.contractForm = this.fb.group({
      reference: this.contract.reference,
      startDate: this.contract.startDate,
      endDate: this.contract.endDate,
      contractType: this.contract.contractType,
      risingAmount: this.contract.risingAmount,
      equipementsID: [this.contract.equipementsID],
      clientID: this.contract.clientID,
    });
  }
  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }

  onSubmit() {
    if (this.file) {
      this.contract = this.contractForm.value;
      this.contractService
        .updateContract(this.file, this.contract, this.contratId, this.userId)
        .subscribe((res) => {
          if (res !== null) this.router.navigate(["admin/contracts/load"]);
        });
    }
  }
}
