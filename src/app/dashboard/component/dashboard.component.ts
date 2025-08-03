import { Component } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';


import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';


// import { TabsModule } from 'primeng/tabs';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CardModule, RouterModule, CommonModule, ButtonModule, AvatarModule, InputTextModule, DialogModule, RippleModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService) { }

  selected_execution: boolean = false;
  selected_management: boolean = false;
  selected_all: boolean = true;
  menuItems = ['All', 'Data Management', 'Execution Process'];
  selected: string = this.menuItems[0];

exerciseGroups: any[] = [];

  ngOnInit(): void {
    

    // let body = {
    //   'screenName': 'dashboard',
    // };

    // this.dashboardService.getHousekeepingExerciseGroup(body).subscribe(
    //     (res: any) => {
    //       this.exerciseGroups = JSON.parse(res.data);// Almacena la respuesta en la variable
    //       console.log('Housekeeping data:', this.exerciseGroups);
    //     },
    //     (err: any) => {
    //       console.error('Error fetching housekeeping data:', err);
    //     }
    //   );
    



  }

  onSelect(item: string) {
    this.selected = item;
    console.log('Seleccionado:', item);
    // Aquí puedes condicionar lo que quieras según el texto
    if (item === 'Data Management') {
      this.selected_execution = false;
      this.selected_all = false;
      this.selected_management = true;
    } else if (item === 'Execution Process') {
      this.selected_execution = true;
      this.selected_all = false;
      this.selected_management = false;
    } else if (item === 'All') {
      this.selected_all = true;
    } else { }
  }



}
