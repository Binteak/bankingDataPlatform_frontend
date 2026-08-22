import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private apiUrl =
    'http://localhost:8001/api/reporting/';


  constructor(
    private http: HttpClient
  ) {}


  // ==========================================================
  // REPORTING HISTORY
  // ==========================================================

  getReports(): Observable<any> {

    return this.http.get(
      this.apiUrl
    );

  }


  // ==========================================================
  // DYNAMIC FILTERS
  // ==========================================================

  getFilters(
    filters: any
  ): Observable<any> {

    let params = new HttpParams()
      .set('action', 'filters');


    Object.keys(filters).forEach(key => {

      const value = filters[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {

        params = params.set(
          this.toSnakeCase(key),
          value
        );

      }

    });


    return this.http.get(
      this.apiUrl,
      { params }
    );

  }


  // ==========================================================
  // CALCULATE REPORT
  // ==========================================================

  generateReport(
    filters: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      filters
    );

  }


  // ==========================================================
  // EXPORT FILTERED EXPOSURES
  // ==========================================================

  exportFilteredData(
    filters: any
  ): Observable<Blob> {

    let params = new HttpParams()
      .set('action', 'export');


    Object.keys(filters).forEach(key => {

      const value = filters[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {

        params = params.set(
          this.toSnakeCase(key),
          value
        );

      }

    });


    return this.http.get(
      this.apiUrl,
      {
        params,
        responseType: 'blob'
      }
    );

  }


  // ==========================================================
  // HELPER
  // ==========================================================

  private toSnakeCase(
    value: string
  ): string {

    return value.replace(
      /[A-Z]/g,
      letter => `_${letter.toLowerCase()}`
    );

  }

}