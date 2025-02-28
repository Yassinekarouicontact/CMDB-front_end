import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { CreateContractComponent } from "../contract/create-contract/create-contract.component";
import { ContractRoutingModule } from "./contract-routing.module";
import { ContractComponent } from "../contract/contract.component";
import { RetreiveContractComponent } from "../contract/retreive-contract/retreive-contract.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { UpdateContractComponent } from "./update-contract/update-contract.component";
import { MatOptionModule } from "@angular/material/core";
@NgModule({
  declarations: [
    ContractComponent,
    CreateContractComponent,
    RetreiveContractComponent,
    UpdateContractComponent,
  ],
  imports: [
    ReactiveFormsModule,MatOptionModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    ContractRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [DatePipe],
})
export class ContractModule {}
