import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/_helpers/auth.guard";
import { ContractComponent } from "./contract/contract.component";
import { RetreiveContractComponent } from "./contract/retreive-contract/retreive-contract.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EquipementComponent } from "./equipement/equipement.component";
import { LoadEquipementsComponent } from "./equipement/load-equipements/load-equipements.component";
import { CommercialDashboardComponent } from "./commercial-dashboard.component";

const routes: Routes = [
  {
    path: "commercial",
    component: CommercialDashboardComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: "equipements",
        component: EquipementComponent,
        children: [{ path: "load", component: LoadEquipementsComponent }],
      },
      {
        path: "contracts",
        component: ContractComponent,
        children: [{ path: "load", component: RetreiveContractComponent }],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommercialDashboardRoutingModule {}
