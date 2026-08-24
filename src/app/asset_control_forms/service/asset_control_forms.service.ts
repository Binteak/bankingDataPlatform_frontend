import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AssetControlFormsService {

  constructor(private http: HttpClient) { }
  
  apiUrl = environment.apiUrl;
//   apiUrl = 'http://127.0.0.1:8000/api';

  getValueDates(body: any) {
    return this.http.post<any>(`${this.apiUrl}getValueDates/`, body);
  }

  getDataTable(body: any) {
    return this.http.post<any>(`${this.apiUrl}getDataTable/`, body);
  }

  uploadCSV(file: File, selectedDate: string, scenario: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('selectedDate', selectedDate);
    formData.append('scenario', scenario);
  
    return this.http.post<any>(`${this.apiUrl}uploadCSV/`, formData);
  }

}