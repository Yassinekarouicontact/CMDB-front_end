import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Equipement } from "app/model/equipement";
import { EquipementService } from "app/_services/equipement.service";

@Component({
  selector: "app-equipement",
  templateUrl: "./equipement.component.html",
  styleUrls: ["./equipement.component.scss"],
})
export class EquipementComponent implements OnInit {
  equipements: Equipement[];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private equipementService: EquipementService,
    // private alert: ToastrService,
    private router: Router
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
      this.dtTrigger.next(null);
    });
  }

  removeEquipement(equipement: Equipement) {
    if (
      confirm(
        "Do you want to remove equipement with serial number: " +
          equipement.serialNumber
      )
    ) {
      this.equipementService
        .deleteEquipementById(equipement.id)
        .subscribe((res) => {
          let result: any;
          result = res;
          // if (result.result == "pass") {
          //   this.alert.success("Removed Successfully.", "Remove Invoice");
          //   this.LoadInvoice();
          // } else {
          //   this.alert.error("Failed to Remove.", "Invoice");
          // }
          // this.alert.success("Removed Successfully.", "Remove Equipement");
          this.LoadEquipements();
        });
    }
  }

  EditEquipement(equipement: Equipement) {
    this.router.navigateByUrl("/editinvoice/" + equipement);
  }
}
