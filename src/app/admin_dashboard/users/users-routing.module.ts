import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routesUsers: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routesUsers)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
