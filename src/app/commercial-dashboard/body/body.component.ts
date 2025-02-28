import { Component, Input } from "@angular/core";
import { TokenStorageService } from "app/_services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"],
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  getBodyClass(): string {
    let styleClass = "";
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = "body-trimmed";
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = "body-md-screen";
    }
    return styleClass;
  }

  // logout() {
  //   this.tokenService.signOut();
  //   this.router.navigate(["/login"]);
  // }
}
