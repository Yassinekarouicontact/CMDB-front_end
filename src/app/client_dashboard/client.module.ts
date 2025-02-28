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
import { authInterceptorProviders } from "app/_helpers/auth.interceptor";
import { TokenStorageService } from "app/_services/token-storage.service";
import { BodyComponent } from "./body/body.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { ComponentsModule } from "./components/components.module";
import { ContractModule } from "./contract/contract.module";

import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { SidenavComponent } from "./sidenav/sidenav.component";

@NgModule({
  declarations: [ClientComponent, BodyComponent, SidenavComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
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
    ChartModule,
    ComponentsModule,
    ContractModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, TokenStorageService],
})
export class ClientModule {}
