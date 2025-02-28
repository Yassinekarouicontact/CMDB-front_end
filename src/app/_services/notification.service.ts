import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getUncheckedNotifications(): Observable<any> {
    return this.httpClient.get("http://localhost:8087/notifications");
  }

  checkNotification(notificationId: number): Observable<any> {
    return this.httpClient.post(
      "http://localhost:8087/notifications/" + notificationId,
      this.httpOptions
    );
  }
}
