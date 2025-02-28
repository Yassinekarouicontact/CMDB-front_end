import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./authentication/login/login.component";

import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { AdminModule } from "./admin_dashboard/admin.module";
import { ResetPasswordComponent } from "./authentication/reset-password/reset-password.component";
import { ForgetPasswordComponent } from "./authentication/send_forget_password_email/forget-password.component";
import { CommercialDashboardModule } from "./commercial-dashboard/commercial-dashboard.module";
import { ConsultantModule } from "./consultant_dashboard/consultant.module";
import { ClientModule } from "./client_dashboard/client.module";
import { EquipmentDetailsModalComponent } from "./admin_dashboard/app-equipment-details-modal/app-equipment-details-modal.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    AdminModule,
    ConsultantModule,
    CommercialDashboardModule,
    ClientModule,
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, NgbModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
