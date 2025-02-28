import { DatePipe } from "@angular/common";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractService } from "app/_services/contract.service";
import { EquipementService } from "app/_services/equipement.service";
import { TokenStorageService } from "app/_services/token-storage.service";
import { ProductGroup } from "app/model/ProductGroup.enum";
import { Equipement } from "app/model/equipement";

@Component({
  selector: "app-update-equipement",
  templateUrl: "./update-equipement.component.html",
  styleUrls: ["./update-equipement.component.css"],
})
export class UpdateEquipementComponent implements OnInit {
  userId: number;
  equipement: any = {};
  contracts: any;
  equipementForm: FormGroup;
  equipementId: any;
  createdBy: number;
  updatedBy: number[];
  currentDateTime = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  productGroup = Object.values(ProductGroup);
  file: File;

  constructor(
    private tokenService: TokenStorageService,
    private equipementService: EquipementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private datepipe: DatePipe,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.equipementId = this.route.snapshot.paramMap.get("id");
    this.equipement = history.state.myObject;
    this.contractService
      .getContracts()
      .subscribe((res) => (this.contracts = res));

    this.equipementForm = this.fb.group({
      serialNumber: this.equipement.serialNumber,
      localisation: this.equipement.localisation,
      host: this.equipement.host,
      ipAddress: this.equipement.ipAddress,
      image: this.equipement.image,
      model: this.equipement.model,
      actualOS: this.equipement.actualOS,
      recolOS: this.equipement.recolOS,
      eos: this.equipement.eos,
      eol: this.equipement.eol,
      constructer: this.equipement.constructer,
      productGroup: this.equipement.productGroup,
      contratId: this.equipement.contratId,
    });
  }

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }

  onSubmit() {
    console.log("iam on ts");
    this.equipement = this.equipementForm.value;
    console.log(this.equipement);

    this.equipement.createdBy = this.createdBy;
    this.equipement.updatedBy = this.updatedBy;
    this.equipementService
      .updateEquipement(
        this.file,
        this.equipement,
        this.equipementId,
        this.userId
      )
      .subscribe((res) => {
        if (res !== null) this.router.navigate(["admin/equipements/load"]);
      });
  }
}
