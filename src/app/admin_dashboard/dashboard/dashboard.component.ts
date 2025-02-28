import { Component, OnInit } from "@angular/core";
import { Chart } from "angular-highcharts";
import { AdminService } from "app/_services/admin.service";
import { ContractService } from "app/_services/contract.service";
import { EquipementService } from "app/_services/equipement.service";
import { Month } from "app/model/Month";
import { Contract } from "app/model/contract";
import { Equipement } from "app/model/equipement";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  contracts: Contract[];
  equipements: Equipement[];
  nbrUsers: number = 0;
  nbrEquipements: number = 0;
  nbrContracts: number = 0;
  nbrAdmin: number = 0;
  nbrClient: number = 0;
  nbrConsultant: number = 0;
  nbrCommercial: number = 0;
  userByRoles: any;
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
    this.adminService.countUserByRole("ADMIN").subscribe((res) => {
      this.nbrAdmin = res;
    });
    this.adminService.countUserByRole("CLIENT").subscribe((res) => {
      this.nbrClient = res;
    });
    this.adminService.countUserByRole("COMMERCIAL").subscribe((res) => {
      this.nbrCommercial = res;
    });
    this.adminService.countUserByRole("CONSULTANT").subscribe((res) => {
      this.nbrConsultant = res;
      this.nbrUsers =
        this.nbrAdmin +
        this.nbrClient +
        this.nbrCommercial +
        this.nbrConsultant;
      this.userByRoles = new Chart({
        chart: {
          type: "pie",
          height: 325,
        },
        title: {
          text: "Users by roles",
        },
        xAxis: {
          categories: ["Admin", "Commercial", "Consultant", "Client"],
        },
        yAxis: {
          title: {
            text: "number",
          },
        },
        series: [
          {
            type: "pie",
            data: [
              {
                name: "Admin",
                y: this.nbrAdmin + 0.0,
                color: "#044342",
              },
              {
                name: "Commercial",
                y: this.nbrCommercial + 0.0,
                color: "#7e0505",
              },
              {
                name: "Consultant",
                y: this.nbrConsultant + 0.0,
                color: "#ed9e20",
              },
              {
                name: "Client",
                y: this.nbrClient + 0.0,
                color: "#6920fb",
              },
            ],
          },
        ],
        credits: {
          enabled: false,
        },
      });
    });

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
      // this.contractSorted = res;
      // console.log(this.contractSorted);
      console.log(res);

      this.contractSortedGraph = new Chart({
        chart: {
          type: "bar",
          height: 225,
        },
        title: {
          text: "top 3 contracts with highest Rising Amount",
        },
        xAxis: {
          categories: ["" + res[0][0], "" + res[1][0], "" + res[2][0]],
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
                name: "" + res[0][0],
                y: res[0][2],
                color: "#044342",
              },
              {
                name: "" + res[1][0],
                y: res[1][2],
                color: "#7e0505",
              },
              {
                name: "" + res[2][0],
                y: res[2][2],
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

  // transactions = [
  //   {
  //     id: 1,
  //     title: "Ryzen 5 Processor",
  //     price: "$299",
  //     shop: "Tech Pro",
  //     location: "East Hartford",
  //     status: "pending",
  //     imgSrc:
  //       "data:image/jpeg;base64,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",
  //   },
  //   {
  //     id: 2,
  //     title: "Denver Blackcode",
  //     price: "$7.89",
  //     shop: "Pick the best",
  //     location: "Miamisburg",
  //     status: "shipped",
  //     imgSrc:
  //       "data:image/jpeg;base64,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",
  //   },
  //   {
  //     id: 3,
  //     title: "Nike Shoes",
  //     price: "$69",
  //     shop: "Quality Leathers",
  //     location: "Phoenix",
  //     status: "confirmed",
  //     imgSrc:
  //       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhQTFhUVFRYVFRgYFxUaFxUVFhYWFxUYFxcYHSggGBolHRgVITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzIgHSUrLTAtKzctMC4rLS0tLi0tNy0tMCstLS0yLS0tLS0tLS0tLS0tNy0tLS0rLSstKy0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xABLEAACAQIDAwgFCAUICwAAAAAAAQIDEQQhMQUSUQYTQWFxgZGhByIyscEUQlJiktHS8HKDk9PhFhcjNFOCssIVM0NEVHN0lKLD8f/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAuEQEAAgIABQIEBAcAAAAAAAAAAQIDEQQSITFRE0EFMmGRFSIzQhQjUnGhsfD/2gAMAwEAAhEDEQA/APcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtc0BcDEqyulx067GUjYAAkAAABp7RxThuqKTnUmoQTyV92Um3boUYyfXa3SWYbEVFV5uruO8HOEopxT3XFSTi27Nb0c753elsw3wABh+Uw+kipEACcAAAAAAAAAAAAAAAAALKtVRV3oBea+JxUYe00m2ku15IjtrbW5lpyT3elrRdp576Str1acITw/syfryveUX0R4pdK60ZWtb9rXFj57crv8fteEJODm4v1Xp0XTau8s1l1XNnD46E1eLT7DiuQ+PxWIw7rVHJ3ldKUVacbawXDuztkzoo4SnNb0FuT6XHLPr4o571zxM2rO48LWrWtuWfulcDvTlvyVkrqK97fu8eokTn8NtKVN7tXNdEuj+H57CcpVVJXRbhc1bRy/u9/LO9ZhkAB1qBhr4hR1MxBbfk79ShfzZhxGSaU3HmE1jcrtqYiM1Sqwd+Zrwb/AEZqVGd+yNVy/um5PPEw6qNW/wDenSt/hZwuL5x0KqpNqUoSSz1dna/E6jkxtJYqTrrSWHw2X0ZTU6kk+u04eB02pNZ6qVtzOhABVZBgACcAAAAAAAAAAAAo2BUo2a2Jr2i3FN8FpfxOA5f8sKuHgoUY2k299vWKWqjwdndPqZWbaXpjm86h3eMxG6t7VdPG3VxOX5Xct6WDjFWc5zXq8Ip3W8+NmrW6zNyexeKrYTnJxUKzi+b31ZNWW65JO6Td30akFtnknHaUKdVS5p3aqRcW3GV7VEtFdSXY7EdZa0rSuTlv28suM5RzxFCGJp0nKh60ayjnVptfOUV7UVm3bOzWWpprB85BbqVWjNKSi07OOTVurqOp2HsOhgaSpUlJuTu7tynOVrX4LuSRsvBTbvLLqj94Z5JrzzNOkeyIw2J3cllbo0t93fYyxxDU1JaPXt/Px4EhV2enrZ/pL46owLCRi/ZzfS235slnpvypxnHNXTRpU5ToS9V3jwfuu9Oxm9RVooq0mc2bhoyfmjpbyvW2uns38Fjo1Flk+lPU2zlMbaDW7r1dHf8AB5Gzhdt5ZvxX3Mvi9eI/PXf1hS1qb7uhZzvKSsknxa3V8S6vt5Wyu/JEDi8RKo7y7jaMNsto5o1ETv8AuzvlisdO5hTL6OHzdbH0G/ZrQqwXClVpqyXUpRmjWpyIultFYfadOo77tWnGnO2lrytdLW2vczq4jpG08HinLaax31v7PVwUiypzroMAATgAAAAAAAALZTSNHH47ctk0n87dbt4adrAxbT2tzbsrWTW/Ju0Y73srrk8suhNN6q8Xyh5Q81RlVit/dtaK4vpbtkuvMwOrhJTzjTnPecru0mpPV78so+KLsZg8JUi+e5u8td2WaXQrx1KTtes13G4anI3lJLG05KSlGUb+slkm+htpreXB6o26eA6MVGnWnCd6MrLfkkk05LSLTum9Mrm1gkowVPDwUILJO1l3LWT62bdDDqOd229ZPV/cuwJvaJtusaQ3KjbssJQdXdg5XUYQbl60n120sm+45bkly9xWLrzpVYUKa3HKCipXumrpylJp5Z6LRmD0vYn+ko0looSn2uUt3/J5nnVPEShJTg3GSd01dNPtLaUfRGBjb1pZzfTwXUbjrWPD6PpIxkVZ83K3S4Z9+60aeP5fY6p/tdxcIJR87X8xoe6V8XFK85JLi3ZeLyOfx/LfA0ta8JPhC8/8F15nheKxdSo96pOc3xlJt+LJjYvJLF4mzp0pKL+fP1YeL17rjSXc7Q9KlKN1Roznwc2oLwV2zncTy72jipc3QW63pGjBuVutu7XbkdJsX0XU42liajqP6ELxj3y9p91jutnbKo0I7tGnCEelRSV+16t9o6IcNsDZ2LoUX8qb3pzclee9JXUU1J8cuJIqsdPtamnSlfoV13HKSO7BbdXJmjVluLxipwlN/NTZyNflXWbysl0KyZ1WIo78ZQ6JRcb9p55VwzhJxesW0+5mPFWtWY1PR7fwPBgy80ZI3Mf6TFPlPiOlx+yvuNbH42VR85J+spRfg9PC5iobNrSzVKbT0e67MvxmBqQhJThKN09V1cTjvN5jrvT3cdOEpf8Al8sT9NPedg4nnMPSn0uEb9qVn5okTmPRziN/AUnwTXx+J05pHZ8tmry5LV8TKDABLJOAGhjdoKOUbOXu7SYjaJnTfLXNIgZ4ubd3L7vAvWOklpH895f05V9SEw63Axym30kZHGTeiv2Rb8yqjVet11tryS/gRyeZOffaEgVuWFsqiWrsUXZGYnSj9GPgjXq7QitLs1auOk+rsLRitKs5IhvzaXSa1XGRRD4raEI+3NJ8L3fgiHxXKGmtN5+Rblx1+aV6Y8+X9Osyw8vtj/LFTnSlGNSneL37pSg89Unmn72cBiuSOLjpTjNfUnF+Umn5HbS5RU/oyL6O26Evnbr+sreei8S9fRt2lN+G4qnW1J+zzWOwcTKapqjNSfFbq8ZWXmdhsT0WzlaWJrRgvo0/Wl9p+qvM6mlUTV4tNcU1byMkW+h+DLTg8S5vWmO8JDYvJHB4azp0U5L58/Xlfim8o9yRP3Ry8MVVWk5eN/eZI7QrfTfhH7jP+Hst61XSbxbKfS8l1nPSx1V6zfcor3I1asm/abfa2/eTHDz7yic0JHbG0VKO5B3vq+jsRBuJsU47ztBOT+rn4vRd5J4TYl86rt9WLz75dHd4m9eXHGmU82SdozCYSdR2hG9tXol2s0cZyAqTqurz9JNy3lHdk1lbJy7uB3UYqK3YpKK0SyRik10swy35+7s4a9+HmZpPWUJPZNZK+7GX6Lv70n5EHyisqE41E07ZJqz3ug7ZVDBjsPTrQ3KsIzjwfR2PWL60LZZmswrirWmWt/Etb0V/1CHa7fZidgQ3JnCU6NPmaSahHNXd9ei710JkwiNRptnvF8lrR7ygwASyV5Z7VlhsHWrR9qMUo9UpyUE+5u/ccnsqq40qabbe5G93m21eTb43bO32/suOJw9ShJ2U42vwaacX3NI4vDbPrQpxhUipSjFRbi7ZxVnlLXTW5rimInqzyRMx0b8MaZqeOtnl1XVyJlT3dVOPbF28VdeZaqkeicftL7zp1EufrDo4bXfSlf8APkJbVb0sc/Gd9JLLg9CL2ztupRlu7qu1dSejXFIyvFKRuXRgx5c9uSnd10sdN9L7sjTxG0IQ9uaXm/A8/r7drT1qWXBZe7U1HWb1Zz24mI+WHr4vglp/Vv8AZ3OI5SQXsJvrehE4rbdSfTZdWRB0KVWeVOnUl2Rk/ciWwfJnGT1p7nXOSj5ZvyOe2TLd6NOD4Ph43Ot/WWlWqX1ZqVJNtKKu3ouL6sjtMFyKis69Vy+rTyX2nm/BHR4DZ9Kiv6GnGHF6yfbJ5sVwzPdXL8Uw0jVI3/iHnuD5JYuqrygqS41JWdv0V63iiWw/o9Xz8R9mHxlL4Ha3MU4u+RrGKsPNyfE89u06c3Q5DUIu6rYhP6soR90SVpbBglbna77XSf8A60Sdra6hGtZ5eziy5LZfn6oyexuFWfeofBIwz2TPoqf+KJqStrbvZjdWK1lBf3l95PrzHux9KvhC/wCh5dNWfYlBf5bmzQ2NTWq3n9ZuXvJBVo9Dj3WfuLlW4b32ZfcVniI97JjHEey6jTUVZJ26lkXSb4Fjm/y4r3st310ygu2cfhcznPTyvyypK/W/s/eW2fQvF/cmVdaC1q012Sb+BrVdoUlpPe7IP3tmVuLxV7ymKTLY3Xxiu5v4orGEelt+XusaGFxLqVFGOjfBXt0k6sNFdBTHxtckbrCZpMd2LDV1F5LVpP8A+kyRNSjHSxtbOqOzi3fddk+Kel/d3GlM3NbSJqjwAbKpwjto4KUmpQcU1qmva4Zr2Xlrn2cJEowOQ2btWnVlKCbjUhlOnP1akO2L1XWrp8SQb7ybnThe7Ub2tdpacOwiNvYebg5YecI1Ixe7CVubnbSMnk48E0+nO5OxiaTyaT6rJlVRj9CH2Y/ccRS5fzhUVHF4KvTqN2XN2qJv6ryTXZJkxg+W2Aq5c/GD0tU3qbT4Xkkr95O9kdOzomkvoruRcpyNSNekkpKaak0k95NO+StJcWbKl1NDSdyv33xZRpLVotMfMK91KS6tV55hDIl3e8Fad/nW6mviAKSlbt6CsZWXxLGmndZ9Q5zpcXHrdre8kVOe21tOo5OnTvGKybzW8+nPgTlPERlfce/+h6y7LrJPtZwVb0kyoTlSqYXdlCTi1KpZ9V1uNZqzybWZz8RjnJXlidL0tFZ3ps83W6LfnuKxhiPpW7zFD0pUH7WHfdKEvekZY+krB9OHqd0aP40ef+HTHazX1vou5iu9Zv7TLo4Op9Lz/iF6RsD/AGNb7FL4VTNT5e7PesKi7Yfhkys/Dr/1J9aPCkcDLi/EyLAvr8Sq5bbM6/2dT7i7+WezPpv9lW/AUn4ZbyetCkcE+HmZFhXwRb/LHZn9o/2Vf8BZPlpsxfPk/wBXW+MUU/DLf9J6yU2ZeEt7LRokvlz6vz3HKT5e7NWiqS7Kcv8AM0a1T0l4Vf6vD1X2qml470jox8FkrGonSk3iXZrESlpfuN/Z892VpWTlpnm2k37jyvGekjEzVqdKnSvkm25vuWS8Uzp/R7s6tVn8txE5zycad9PWyk4rRR7Er36jrw8PyTuZ3KlrbdKADqUThRoqAMU6N+Jo4vZO/pNruJMAcXtDkbWn7NeK7Yv4M5HanojxFRtqrhru7btUi23q3u6vtPYgB4fR9FW0qS3adbD7t07KdRJtZp2cbX6zFW5C7ehJyp1W23d2xUo3b11PdQB4THk5yljpOf8A3NN/4mZY7K5ULRvvnhX7z3EAeKf6I5TufONUU3Hdsp07Wta+7fdv06amCtyc5SvSpJPj8opryjke5ADwb+RvKSXtVpW/6p/ApH0b7ZlLeqSpya+lXlL3pnvQA8UjyC2za3OUf20vhAitq+iva1V70vk8na1+eldpaLOB9AAD5tn6KdrpK1Gi7aWrU/ja5ifox2xnfDJ34VqPl6x9LgD5m/m32ylb5I/21H8ZZ/N1tlP+pyfVztD8Z9OAD5kqej7bT0wc1+tw/wC8LqfIDbK1wc3+tofvD6ZAHzPLkBtlv+pzS/5uH/eGSnyB2wv9zlfrq0P3h9KAJ2+b16P9tf8ACpfraP4zPQ9Gm2G86UIrrq035Jn0SAh5TyW9GDpyU8XHnZLPdclza7Yx9rsba6j1GhBpJZJLJJaJdRlAEGCU+Rw4ebAGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z",
  //   },
  // ];
}
