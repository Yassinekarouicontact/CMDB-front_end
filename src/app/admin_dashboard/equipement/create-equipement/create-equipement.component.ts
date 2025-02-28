import { DatePipe } from "@angular/common";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ContractService } from "app/_services/contract.service";
import { EquipementService } from "app/_services/equipement.service";
import { TokenStorageService } from "app/_services/token-storage.service";
import { Equipement } from "app/model/equipement";
import { ProductGroup } from "app/model/ProductGroup.enum";

@Component({
  selector: "app-create-equipement",
  templateUrl: "./create-equipement.component.html",
  styleUrls: ["./create-equipement.component.css"],
})
export class CreateEquipementComponent implements OnInit {
  @Output() equipmentCreated = new EventEmitter<any>();
  contracts: any[];
  productGroup = Object.values(ProductGroup);
  formData = {
    productGroup: "",
  };

  equipement: Equipement = {};
  userId: number;
  @ViewChild("equipementForm") equipementForm: NgForm;
  currentDateTime = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  file: File;

  constructor(
    private equipementService: EquipementService,
    private tokenService: TokenStorageService,
    private router: Router,
    private datepipe: DatePipe,
    private contratService: ContractService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
    this.contratService
      .getContracts()
      .subscribe((res) => (this.contracts = res));
  }
  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }
  onSubmit() {
    if (this.file) {
      this.equipement = this.equipementForm.value;
      this.equipementService
        .addEquipement(this.file, this.equipement, this.userId)
        .subscribe((res) => {
          if (res !== null) {
            this.router.navigate(["admin/equipements/load"]);
          }
        });
      this.equipmentCreated.emit(this.equipement);
    }
  }
}
