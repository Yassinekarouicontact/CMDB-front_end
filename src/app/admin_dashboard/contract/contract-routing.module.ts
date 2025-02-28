import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routesContract: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routesContract)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
