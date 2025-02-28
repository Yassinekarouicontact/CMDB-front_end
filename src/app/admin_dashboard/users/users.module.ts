import { UsersRoutingModule } from "./users-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { DataTablesModule } from "angular-datatables";
import { CreateUserComponent } from "./create-user/create-user.component";
import { UsersComponent } from "./users.component";
import { LoadUsersComponent } from "./load-users/load-users.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { ToastrModule } from "ngx-toastr";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    LoadUsersComponent,
    UpdateUserComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
})
export class UsersModule {}
