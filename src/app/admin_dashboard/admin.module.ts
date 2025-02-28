import { UsersModule } from "./users/users.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { authInterceptorProviders } from "app/_helpers/auth.interceptor";
import { TokenStorageService } from "app/_services/token-storage.service";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { BodyComponent } from "./body/body.component";
import { EquipementModule } from "./equipement/equipement.module";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ContractModule } from "./contract/contract.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartModule } from "angular-highcharts";
import { ComponentsModule } from "app/consultant_dashboard/components/components.module";
import { UserModalComponent } from "./app-user-modal/app-user-modal.component";
import { EquipmentDetailsModalComponent } from "./app-equipment-details-modal/app-equipment-details-modal.component";
import { AppContractDetailsModalComponent } from "./app-contract-details-modal/app-contract-details-modal.component";
import { AppUpdatedByDetailsModalComponent } from "./app-updated-by-details-modal/app-updated-by-details-modal.component";
import { AppCreateEquipementModalComponent } from "./app-create-equipement-modal/app-create-equipement-modal.component";

@NgModule({
  declarations: [
    SidenavComponent,
    AdminComponent,
    BodyComponent,
    DashboardComponent,
    UserModalComponent,
    EquipmentDetailsModalComponent,
    AppContractDetailsModalComponent,
    AppUpdatedByDetailsModalComponent,
    AppCreateEquipementModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    HttpClientModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    MatInputModule,
    NgbModule,
    BrowserAnimationsModule,
    DataTablesModule,
    EquipementModule,
    UsersModule,
    ContractModule,
    ChartModule,
    ComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, TokenStorageService],
})
export class AdminModule {}
