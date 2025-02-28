import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "../_services/token-storage.service";
import { Role } from "../model/role.enum";
import { Router } from "@angular/router";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  role = Role;

  constructor(
    private tokenStorageService: TokenStorageService,
    public router: Router
  ) {}

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    if (user) {
      this.isLoggedIn = true;
      this.role = user.role;
    }
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
