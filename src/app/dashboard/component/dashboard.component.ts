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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    RouterModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    DialogModule,
    RippleModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  menuItems = [
    'All',
    'Data Ingestion',
    'Data Governance',
    'Data Analysis',
    'Risk Reporting'
  ];

  selected = 'All';

  exerciseGroups: any[] = [];

  ngOnInit(): void {
  }

  onSelect(item: string): void {
    this.selected = item;
  }

  openModule(route: string): void {

    this.router.navigate([route]).then(() => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

    });

  }

}