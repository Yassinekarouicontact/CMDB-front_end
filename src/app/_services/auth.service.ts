import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: any;
  private AUTH_API = "http://localhost:8090";
  currentUserValue: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  login(user: any) {
    const payload = new HttpParams()
      .set("username", user.username)
      .set("password", user.password);

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.tokenStorage.getToken()}`,
      }),
    };

    return this.http.post<any>(this.AUTH_API + "/login", payload, httpOptions);
  }

  getRole(): string {
    return this.user.role;
  }
  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
