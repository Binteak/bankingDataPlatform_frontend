import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private apiUrl =
    'http://127.0.0.1:8001/api';

  constructor(
    private http: HttpClient
  ) {}


  getReports(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/reporting/`
    );

  }


  generateReport(
    reportingDate: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/reporting/`,
      {
        reporting_date:
          reportingDate
      }
    );

  }

}