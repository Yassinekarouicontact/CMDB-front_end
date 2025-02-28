import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipement } from "app/model/equipement";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EquipementService {
  constructor(private httpClient: HttpClient) {}

  private BASE_URL = "http://localhost:8091/equipements";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  searchEquipments(serialNumber: string): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/serialNumber?serialNumber=` + serialNumber
    );
  }
  getEquipements(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}`);
  }
  getEquipement(equipementIds: number[]): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}=` + equipementIds);
  }

  getEquipementById(equipementId: number): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/getbyId?equipementId=` + equipementId
    );
  }

  addEquipement(file: File, equipement: any, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    const equipementJson = JSON.stringify(equipement);
    const equipementBlob = new Blob([equipementJson], {
      type: "application/json",
    });
    formData.append("equipementdto", equipementBlob);
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.httpClient.post<any>(
      `${this.BASE_URL}/` + userId,
      formData,
      httpOptions
    );
  }

  updateEquipement(
    file: File,
    equipement: any,
    equipementId: number,
    userId: number
  ): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    const equipementJson = JSON.stringify(equipement);
    const equipementBlob = new Blob([equipementJson], {
      type: "application/json",
    });
    formData.append("equipementdto", equipementBlob);
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.httpClient.put<any>(
      `${this.BASE_URL}/` + equipementId + "/" + userId,
      formData,
      httpOptions
    );
  }

  getEquipementFile(equipementId: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/` + equipementId, {
      responseType: "blob",
    });
  }

  deleteEquipementById(equipementId: number): Observable<any> {
    return this.httpClient.delete(
      `${this.BASE_URL}?idEquipement=` + equipementId
    );
  }
}
