import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-verify-account",
  templateUrl: "./verify-account.component.html",
  styleUrls: ["./verify-account.component.css"],
})
export class VerifyAccountComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams["token"];
    this.activateAccount(token);
  }

  activateAccount(token: string): void {
    console.log("Token:", this.token);
    this.http
      .get(`http://localhost:8085/registrationApi?token=${this.token}`)
      .subscribe(
        () => console.log("success"),
        (error) => console.log(error)
      );
  }
}
