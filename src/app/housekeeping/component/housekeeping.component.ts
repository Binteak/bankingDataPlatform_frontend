import { Component } from '@angular/core';
import { HousekeepingService } from '../service/housekeeping.service';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-housekeeping',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CardModule, RouterModule, CommonModule, ButtonModule, AvatarModule, InputTextModule, DialogModule, RippleModule],
  templateUrl: './housekeeping.component.html',
  styleUrl: './housekeeping.component.css'
})
export class HousekeepingComponent {

  constructor(private housekeepingService: HousekeepingService) { }

  selected_execution: boolean = false;
  selected_management: boolean = false;
  selected_all: boolean = true;
  menuItems = ['All', 'Data Management', 'Execution Process'];
  selected: string = this.menuItems[0];

exerciseGroups: any[] = [];


// Estado de los 5 seleccionables (true = seleccionado)
selectable = [false, false, false, false, false];

// Switches
switchA = false;
switchB = false;

// Input
inputText = '';

  ngOnInit(): void {
    

    let body = {
      'screenName': 'dashboard',
    };

    this.housekeepingService.getHousekeepingExerciseGroup(body).subscribe(
        (res: any) => {
          this.exerciseGroups = JSON.parse(res.data);// Almacena la respuesta en la variable
          console.log('Housekeeping data:', this.exerciseGroups);
        },
        (err: any) => {
          console.error('Error fetching housekeeping data:', err);
        }
      );
    



  }




toggleSelectable(index: number) {
  this.selectable[index] = !this.selectable[index];
}

launch() {
  const payload = {
    selected: this.selectable.map((v, i) => ({ index: i, selected: v })).filter(x => x.selected),
    switchA: this.switchA,
    switchB: this.switchB,
    inputText: this.inputText
  };
  console.log('Launch payload:', payload);
  // Aquí puedes llamar a un servicio o emitir un evento
}



}