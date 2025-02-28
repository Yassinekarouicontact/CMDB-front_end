import { Component, OnInit } from "@angular/core";
import { Chart } from "angular-highcharts";
import { AdminService } from "app/_services/admin.service";
import { ContractService } from "app/_services/contract.service";
import { EquipementService } from "app/_services/equipement.service";
import { Month } from "app/model/Month";
import { Contract } from "app/model/contract";
import * as Highcharts from "highcharts";

import { Equipement } from "app/model/equipement";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  contracts: Contract[];
  Highcharts = Highcharts;
  equipements: Equipement[];
  nbrEquipements: number = 0;
  nbrContracts: number = 0;
  contractSortedGraph: any;
  contractsKeyDates: any;
  contractSorted: Contract[] = [];
  incomingContract: Month = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };
  outgoingContract: Month = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  constructor(
    private contractService: ContractService,
    private adminService: AdminService,
    private equipementService: EquipementService
  ) {}

  ngOnInit(): void {
    this.contractService.getContracts().subscribe((res) => {
      this.contracts = res;
      this.nbrContracts = this.contracts.length;
      this.contracts.forEach((contrat) => {
        const startDate = new Date(contrat.startDate);
        let monthOfIncoming = startDate.getMonth();

        switch (monthOfIncoming) {
          case 0:
            this.incomingContract.january++;
            break;
          case 1:
            this.incomingContract.february + 1;
            break;
          case 2:
            this.incomingContract.march++;
            break;
          case 3:
            this.incomingContract.april++;
            break;
          case 4:
            this.incomingContract.may++;
            break;
          case 5:
            this.incomingContract.june++;
            break;
          case 6:
            this.incomingContract.july++;
            break;
          case 7:
            this.incomingContract.august++;
            break;
          case 8:
            this.incomingContract.september++;
            break;
          case 9:
            this.incomingContract.october++;
            break;
          case 10:
            this.incomingContract.november++;
            break;
          case 11:
            this.incomingContract.december++;
            break;
        }
        const endDate = new Date(contrat.endDate);
        let monthOfOutGoing = endDate.getMonth();

        switch (monthOfOutGoing) {
          case 0:
            this.outgoingContract.january++;
            break;
          case 1:
            this.outgoingContract.february++;
            break;
          case 2:
            this.outgoingContract.march++;
            break;
          case 3:
            this.outgoingContract.april++;
            break;
          case 4:
            this.outgoingContract.may++;
            break;
          case 5:
            this.outgoingContract.june++;
            break;
          case 6:
            this.outgoingContract.july++;
            break;
          case 7:
            this.outgoingContract.august++;
            break;
          case 8:
            this.outgoingContract.september++;
            break;
          case 9:
            this.outgoingContract.october++;
            break;
          case 10:
            this.outgoingContract.november++;
            break;
          case 11:
            this.outgoingContract.december++;
            break;
        }
      });

      this.contractsKeyDates = new Chart({
        chart: {
          type: "line",
          height: 325,
        },
        title: {
          text: "Flow of incoming and outgoing contracts per month",
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "number of contracts",
          },
        },
        series: [
          {
            name: "incoming",
            type: "line",
            color: "#044342",
            data: [
              this.incomingContract.january,
              this.incomingContract.february,
              this.incomingContract.march,
              this.incomingContract.april,
              this.incomingContract.may,
              this.incomingContract.june,
              this.incomingContract.july,
              this.incomingContract.august,
              this.incomingContract.september,
              this.incomingContract.october,
              this.incomingContract.november,
              this.incomingContract.december,
            ],
          },
          {
            name: "outgoing",
            type: "line",
            color: "#7e0505",
            data: [
              this.incomingContract.january,
              this.outgoingContract.february,
              this.outgoingContract.march,
              this.outgoingContract.april,
              this.outgoingContract.may,
              this.outgoingContract.june,
              this.outgoingContract.july,
              this.outgoingContract.august,
              this.outgoingContract.september,
              this.outgoingContract.october,
              this.outgoingContract.november,
              this.outgoingContract.december,
            ],
          },
        ],
        credits: {
          enabled: false,
        },
      });
    });
    this.equipementService.getEquipements().subscribe((res) => {
      this.equipements = res;
      this.nbrEquipements = this.equipements.length;
    });

    this.contractService.getContractsOrderByRisingAmount().subscribe((res) => {
      this.contractSorted = res;
      this.contractSortedGraph = new Chart({
        chart: {
          type: "bar",
          height: 225,
        },
        title: {
          text: "top 3 contracts with highest Rising Amount",
        },
        xAxis: {
          categories: [
            "" + this.contractSorted[0].id,
            "" + this.contractSorted[1].id,
            "" + this.contractSorted[2].id,
          ],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        series: [
          {
            type: "bar",
            showInLegend: false,
            data: [
              {
                name: "" + this.contractSorted[0].id,
                y: this.contractSorted[0].risingAmount,
                color: "#044342",
              },
              {
                name: "" + this.contractSorted[1].id,
                y: this.contractSorted[1].risingAmount,
                color: "#7e0505",
              },
              {
                name: "" + this.contractSorted[2].id,
                y: this.contractSorted[2].risingAmount,
                color: "#ed9e20",
              },
            ],
          },
        ],
        credits: {
          enabled: false,
        },
      });
    });
  }
}
