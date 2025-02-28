import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientComponent } from "./client.component";
import { AuthGuard } from "app/_helpers/auth.guard";
import { ContractComponent } from "./contract/contract.component";
import { RetreiveContractComponent } from "./contract/retreive-contract/retreive-contract.component";

const routes: Routes = [
  {
    path: "client",
    component: ClientComponent,
    children: [
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
export class ClientRoutingModule {}
