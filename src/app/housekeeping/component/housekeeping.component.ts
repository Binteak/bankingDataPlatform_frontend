import { Component } from '@angular/core';
import { HousekeepingService } from '../service/housekeeping.service';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';


import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-housekeeping',
  standalone: true,
  imports: [HttpClientModule, CardModule, RouterModule, CommonModule, ButtonModule, AvatarModule, InputTextModule, DialogModule, RippleModule],
  templateUrl: './housekeeping.component.html',
  styleUrl: './housekeeping.component.css'
})
export class HousekeepingComponent {

  constructor(private dashboardService: HousekeepingService) { }

  selected_execution: boolean = false;
  selected_management: boolean = false;
  selected_all: boolean = true;
  menuItems = ['All', 'Data Management', 'Execution Process'];
  selected: string = this.menuItems[0];

exerciseGroups: any[] = [];

  ngOnInit(): void {
    

    let body = {
      'screenName': 'dashboard',
    };

    this.dashboardService.getHousekeepingExerciseGroup(body).subscribe(
        (res: any) => {
          this.exerciseGroups = JSON.parse(res.data);// Almacena la respuesta en la variable
          console.log('Housekeeping data:', this.exerciseGroups);
        },
        (err: any) => {
          console.error('Error fetching housekeeping data:', err);
        }
      );
    



  }
}