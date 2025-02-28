import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { UserInformations } from "app/model/user.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "",
  }),
};
@Injectable({
  providedIn: "root",
})
export class UserService {
  private BASE_URL = "http://localhost:8090/forgetPassword";

  private token: string;
  errorMessage: string;

  constructor(private http: HttpClient) {}

  sendResetPasswordToken(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.BASE_URL}`, { email }).pipe(
      tap((response: boolean) => {
        if (response) {
          console.log("Password reset email sent successfully");
        } else {
          console.log("User not found");
        }
      })
    );
  }

  updatePassword(newPassword: string, resetPasswordToken: string) {
    const body = { password: newPassword };
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const url = `${this.BASE_URL}?token=${resetPasswordToken}`; // URL de la ressource avec le paramètre dans l'URL
    return this.http.put(url, body, { headers });
  }
}
