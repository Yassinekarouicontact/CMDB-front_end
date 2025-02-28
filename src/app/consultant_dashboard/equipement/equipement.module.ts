import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { EquipementRoutingModule } from "./equipement-routing.module";
import { EquipementComponent } from "../equipement/equipement.component";
import { LoadEquipementsComponent } from "../equipement/load-equipements/load-equipements.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { UpdateEquipementComponent } from "../equipement/update-equipement/update-equipement.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ComponentsModule } from "app/consultant_dashboard/components/components.module";

@NgModule({
  declarations: [
    EquipementComponent,
    LoadEquipementsComponent,
    UpdateEquipementComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    EquipementRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ComponentsModule, // ToastrModule added
  ],
  providers: [DatePipe],
})
export class EquipementModule {}
