import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { CreateEquipementComponent } from "../equipement/create-equipement/create-equipement.component";
import { EquipementRoutingModule } from "./equipement-routing.module";
import { EquipementComponent } from "../equipement/equipement.component";
import { LoadEquipementsComponent } from "../equipement/load-equipements/load-equipements.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { UpdateEquipementComponent } from "../equipement/update-equipement/update-equipement.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ComponentsModule } from "app/consultant_dashboard/components/components.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
@NgModule({
  declarations: [
    EquipementComponent,
    CreateEquipementComponent,
    LoadEquipementsComponent,
    UpdateEquipementComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    EquipementRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ComponentsModule,
    MatOptionModule,
  ],
  providers: [DatePipe],
})
export class EquipementModule {}
