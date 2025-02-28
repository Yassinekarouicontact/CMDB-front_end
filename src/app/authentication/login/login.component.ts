import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../_services/auth.service";
import { TokenStorageService } from "../../_services/token-storage.service";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";
import { Role } from "../../model/role.enum";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm") loginForm: NgForm;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  role: Role;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getUser() !== null) {
      const userRole = this.tokenStorage.getUserRole()[0];
      switch (userRole) {
        case Role.ADMIN:
          this.router.navigate(["/admin/dashboard"]);
          break;
        case Role.CONSULTANT:
          this.router.navigate(["/consultant/dashboard"]);
          break;
        case Role.COMMERCIAL:
          this.router.navigate(["/commercial/dashboard"]);
          break;
        case Role.CLIENT:
          this.router.navigate(["/client/dashboard"]);
        default:
          console.log("Role not known");
          break;
      }
    }
    const video = document.getElementById("bg-video") as HTMLVideoElement;
    video.muted = true;
  }
  reloadPage() {
    window.location.reload();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        const token = response.access_token;
        const decodedToken: any = jwt_decode(token);
        const userRole = decodedToken.role[0];
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(decodedToken);

        switch (userRole) {
          case Role.ADMIN:
            this.router.navigate(["/admin/dashboard"]);
            break;
          case Role.CONSULTANT:
            this.router.navigate(["/consultant/dashboard"]);
            break;
          case Role.COMMERCIAL:
            this.router.navigate(["/commercial/dashboard"]);
            break;
          case Role.CLIENT:
            this.router.navigate(["/client/contracts/load"]);
            break;
          default:
            console.log("Role not known");
            break;
        }
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
