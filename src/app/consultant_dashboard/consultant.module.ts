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
import { ConsultantRoutingModule } from "./consultant-routing.module";
import { ConsultantComponent } from "./consultant.component";
import { BodyComponent } from "./body/body.component";
import { EquipementModule } from "./equipement/equipement.module";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ContractModule } from "./contract/contract.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChartModule } from "angular-highcharts";
import { ComponentsModule } from "app/consultant_dashboard/components/components.module";

@NgModule({
  declarations: [
    SidenavComponent,
    ConsultantComponent,
    BodyComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConsultantRoutingModule,
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
    ContractModule,
    ChartModule,
    ComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, TokenStorageService],
})
export class ConsultantModule {}
