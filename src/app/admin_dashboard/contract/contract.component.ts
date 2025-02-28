import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Contract } from "app/model/contract";
import { ContractService } from "app/_services/contract.service";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit {
  contracts: Contract[];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private contractService: ContractService,
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
    this.RetreiveContracts();
  }

  RetreiveContracts() {
    this.contractService.getContracts().subscribe((res) => {
      this.contracts = res;
      this.dtTrigger.next(null);
    });
  }

  // removeEquipement(equipement: Contract) {
  //   if (
  //     confirm(
  //       "Do you want to remove equipement with serial number: " +
  //         equipement.serialNumber
  //     )
  //   ) {
  //     this.equipementService
  //       .deleteEquipementById(equipement.id)
  //       .subscribe((res) => {
  //         let result: any;
  //         result = res;
  // if (result.result == "pass") {
  //   this.alert.success("Removed Successfully.", "Remove Invoice");
  //   this.LoadInvoice();
  // } else {
  //   this.alert.error("Failed to Remove.", "Invoice");
  // }
  // this.alert.success("Removed Successfully.", "Remove Equipement");
  // this.LoadEquipements();
  //       });
  //   }
  // }

  EditContract(contract: Contract) {
    this.router.navigateByUrl("/editinvoice/" + contract);
  }
}
