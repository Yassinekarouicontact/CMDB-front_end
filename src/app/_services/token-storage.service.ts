import { Injectable } from "@angular/core";
import { UserInformations } from "app/model/user.model";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public getUserRole(): string | null {
    const user = this.getUser();
    if (user) {
      return user.role;
    }
    return null;
  }

  public clear() {
    window.sessionStorage.clear();
  }
  public getUserEmail(): string | null {
    const user = this.getUser();
    if (user) {
      return user.sub;
    }
    return null;
  }
  public getUserId(): string | null {
    const user = this.getUser();
    if (user) {
      return user.id;
    }
    return null;
  }
}
