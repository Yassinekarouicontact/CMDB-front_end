import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { ResetPasswordComponent } from "./authentication/reset-password/reset-password.component";
import { ForgetPasswordComponent } from "./authentication/send_forget_password_email/forget-password.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
