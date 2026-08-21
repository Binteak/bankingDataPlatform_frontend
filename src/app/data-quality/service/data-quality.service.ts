import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataQualityService {

  private apiUrl =
    'http://127.0.0.1:8001/api';

  constructor(
    private http: HttpClient
  ) {}

  getResults(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/dataQuality/`
    );

  }


  runChecks(): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/dataQuality/`,
      {}
    );

  }

}