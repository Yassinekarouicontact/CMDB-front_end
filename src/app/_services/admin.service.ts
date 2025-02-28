import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRegistrationRequest } from "app/model/RegistrationRequest";
import { DeleteUserRequest } from "app/model/deleteRequest";
import { UpdateUserRequest } from "app/model/updateRequest";
import { UserInformations } from "app/model/user.model";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private BASE_URL = "http://localhost:8090";

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  addUser(userRegistrationRequest: UserRegistrationRequest): Observable<any> {
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.tokenStorage.getToken(),
      }),
    };
    return this.http.post<any>(
      `${this.BASE_URL}/registrationApi`,
      userRegistrationRequest,
      httpOptionsAuth
    );
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<any> {
    const token = this.tokenStorage.getToken();
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
    const url = `${this.BASE_URL}/updateUser`;
    return this.http.put<UserInformations>(
      url,
      updateUserRequest,
      httpOptionsAuth
    );
  }

  deleteUser(user: any): Observable<String> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const options = {
      headers: headers,
      body: user,
    };

    return this.http.request<any>(
      "DELETE",
      `${this.BASE_URL}/deleteUser`,
      options
    );
  }

  getUsers(): Observable<UserInformations[]> {
    return this.http.get<UserInformations[]>(`${this.BASE_URL}/users`);
  }

  getUserInformations(id: number): Observable<UserInformations> {
    return this.http.get<UserInformations>(
      `${this.BASE_URL}/users/retreiveById?userId=` + id
    );
  }
  public getUserInfoByEmail(email: string): Observable<UserInformations> {
    return this.http.get<UserInformations>(
      `${this.BASE_URL}/users/retrieveByEmail?email=` + email
    );
  }

  getUserByEmail(email: String): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/users/retrieveByEmail?email=` + email
    );
  }
  countUserByRole(role: String): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/countByRole?role=` + role);
  }
  getAllClients(): Observable<UserInformations[]> {
    return this.http.get<UserInformations[]>(`${this.BASE_URL}/users/clients`);
  }
}
