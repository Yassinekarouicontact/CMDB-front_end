import { CreateUserComponent } from "./users/create-user/create-user.component";
import { LoadUsersComponent } from "./users/load-users/load-users.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CreateEquipementComponent } from "./equipement/create-equipement/create-equipement.component";
import { EquipementComponent } from "./equipement/equipement.component";
import { UsersComponent } from "./users/users.component";
import { LoadEquipementsComponent } from "./equipement/load-equipements/load-equipements.component";
import { UpdateUserComponent } from "./users/update-user/update-user.component";
import { UpdateEquipementComponent } from "./equipement/update-equipement/update-equipement.component";
import { AuthGuard } from "app/_helpers/auth.guard";
import { ContractComponent } from "./contract/contract.component";
import { RetreiveContractComponent } from "./contract/retreive-contract/retreive-contract.component";
import { CreateContractComponent } from "./contract/create-contract/create-contract.component";
import { UpdateContractComponent } from "./contract/update-contract/update-contract.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserModalComponent } from "./app-user-modal/app-user-modal.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: "users",
        component: UsersComponent,
        children: [
          { path: "load", component: LoadUsersComponent },
          { path: "create", component: CreateUserComponent },
          { path: "update/:id", component: UpdateUserComponent },
        ],
      },
      
      {
        path: "equipements",
        component: EquipementComponent,
        children: [
          { path: "load", component: LoadEquipementsComponent },
          { path: "create", component: CreateEquipementComponent },
          { path: "update/:id", component: UpdateEquipementComponent },
        ],
      },
      {
        path: "contracts",
        component: ContractComponent,
        children: [
          { path: "load", component: RetreiveContractComponent },
          { path: "create", component: CreateContractComponent },
          { path: "update/:id", component: UpdateContractComponent },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
