import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private httpClient: HttpClient) {}

  private BASE_URL = "http://localhost:8092/contracts";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getContracts(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}`);
  }
  getContractById(contractId: number): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}/getbyId?contractId=` + contractId
    );
  }

  getContractsOrderByRisingAmount(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/sortedByRA`);
  }

  addContract(file: File, contract: any, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    const contractJson = JSON.stringify(contract);
    const contractBlob = new Blob([contractJson], {
      type: "application/json",
    });
    formData.append("contractDto", contractBlob);
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.httpClient.post<any>(
      `${this.BASE_URL}/` + userId,
      formData,
      httpOptions
    );
  }

  getContractFile(contractId: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/` + contractId, {
      responseType: "blob",
    });
  }

  updateContract(
    file: File,
    contract: any,
    contratId: number,
    userId: number
  ): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    const contractJson = JSON.stringify(contract);
    const contractBlob = new Blob([contractJson], {
      type: "application/json",
    });
    formData.append("contractDto", contractBlob);
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    return this.httpClient.put<any>(
      `${this.BASE_URL}/` + contratId + "/" + userId,
      formData,
      httpOptions
    );
  }

  deleteContractById(contratId: number): Observable<any> {
    return this.httpClient.delete(`${this.BASE_URL}?contratId=` + contratId);
  }
}
