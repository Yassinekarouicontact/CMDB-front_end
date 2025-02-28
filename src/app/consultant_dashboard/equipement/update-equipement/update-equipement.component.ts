import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
  equipement: Equipement = {};
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
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;

    this.equipementId = this.route.snapshot.paramMap.get("id");
    this.equipement = history.state.myObject;

    this.createdBy = this.equipement.createdBy;
    this.updatedBy = this.equipement.updatedBy;

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
    if (this.file) {
      this.equipement = this.equipementForm.value;
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
}
