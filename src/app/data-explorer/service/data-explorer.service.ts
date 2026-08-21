import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExplorerService {

  private apiUrl = 'http://127.0.0.1:8001/api/getRiskExposures/';

  constructor(private http: HttpClient) {}

  getDataTable(body: any = {}): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}