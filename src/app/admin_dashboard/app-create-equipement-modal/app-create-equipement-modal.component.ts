import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import { OnInit, ViewChild, EventEmitter, Output } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { EquipementService } from "app/_services/equipement.service";
import { TokenStorageService } from "app/_services/token-storage.service";
import { Equipement } from "app/model/equipement";
import { ProductGroup } from "app/model/ProductGroup.enum";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-app-create-equipement-modal",
  templateUrl: "./app-create-equipement-modal.component.html",
  styleUrls: ["./app-create-equipement-modal.component.css"],
})
export class AppCreateEquipementModalComponent implements OnInit {
  @Output() equipmentCreated = new EventEmitter<any>();
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
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUser().id;
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
          console.log(res + " id normalement");

          this.equipement.id = res;
          this.equipmentCreated.emit(this.equipement);
          this.closeModal();
        });
    }
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
