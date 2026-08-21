import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

import { ReportingService } from '../service/audit-reporting.service';


@Component({

  standalone: true,

  selector: 'app-reporting',

  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    DividerModule,
    InputTextModule,
    TagModule
  ],

  templateUrl:
    './audit-reporting.component.html',

  styleUrls: [
    './audit-reporting.component.css'
  ]

})


export class ReportingComponent
  implements OnInit {


  reports: any[] = [];

  loading = false;

  generating = false;


  reportingDate = '2026-06-30';


  constructor(
    private api: ReportingService
  ) {}


  ngOnInit(): void {

    this.loadReports();

  }


  loadReports(): void {

    this.loading = true;

    this.api.getReports()
      .subscribe({

        next: (response: any) => {

          this.reports =
            response?.data ?? [];

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }


  generateReport(): void {

    this.generating = true;

    this.api.generateReport(
      this.reportingDate
    )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Report generated:',
            response
          );

          this.generating = false;

          this.loadReports();

        },

        error: (error: any) => {

          console.error(error);

          this.generating = false;

        }

      });

  }

}