import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routesEquipement: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routesEquipement)],
  exports: [RouterModule],
})
export class EquipementRoutingModule {}
