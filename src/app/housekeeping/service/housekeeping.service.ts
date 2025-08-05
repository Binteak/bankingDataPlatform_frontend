import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HousekeepingService {

  constructor(private http: HttpClient) { }
  
  apiUrl = environment.apiUrl;

  getHousekeepingExerciseGroup(body: any) {
    return this.http.post<any>(
      `${this.apiUrl}/getHousekeepingExerciseGroup/`,
      body
    );
  }

  
}