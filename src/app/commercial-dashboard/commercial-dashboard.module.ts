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
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { ChartModule } from "angular-highcharts";
import { BodyComponent } from "./body/body.component";
import { CommercialDashboardRoutingModule } from "./commercial-dashboard-routing.module";
import { CommercialDashboardComponent } from "./commercial-dashboard.component";
import { ComponentsModule } from "./components/components.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EquipementModule } from "./equipement/equipement.module";
import { SidenavComponent } from "./sidenav/sidenav.component";

import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { authInterceptorProviders } from "app/_helpers/auth.interceptor";
import { TokenStorageService } from "app/_services/token-storage.service";
@NgModule({
  declarations: [
    SidenavComponent,
    CommercialDashboardComponent,
    BodyComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    CommercialDashboardRoutingModule,
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
    ChartModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, TokenStorageService],
})
export class CommercialDashboardModule {}
