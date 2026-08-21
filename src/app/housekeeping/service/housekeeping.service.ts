import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousekeepingService {

  private apiUrl = 'http://127.0.0.1:8001/api';

  constructor(
    private http: HttpClient
  ) {}

  search(filters: any): Observable<any> {

    let params = new HttpParams();

    Object.keys(filters).forEach(key => {

      const value = filters[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        params = params.set(
          key,
          value
        );
      }

    });

    return this.http.get(
      `${this.apiUrl}/housekeeping/`,
      { params }
    );
  }


  deleteRecords(ids: number[]): Observable<any> {

    return this.http.request(
      'DELETE',
      `${this.apiUrl}/housekeeping/`,
      {
        body: {
          ids
        }
      }
    );
  }

}