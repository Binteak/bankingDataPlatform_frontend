import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { DataQualityService } from '../service/data-quality.service';


@Component({

  standalone: true,

  selector: 'app-data-quality',

  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    DividerModule,
    TagModule
  ],

  templateUrl:
    './data-quality.component.html',

  styleUrls: [
    './data-quality.component.css'
  ]

})


export class DataQualityComponent
  implements OnInit {


  results: any[] = [];

  loading = false;

  running = false;


  constructor(
    private api: DataQualityService
  ) {}


  ngOnInit(): void {

    this.loadResults();

  }


  loadResults(): void {

    this.loading = true;

    this.api.getResults()
      .subscribe({

        next: (response: any) => {

          this.results =
            response?.data ?? [];

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

        }

      });

  }


  runChecks(): void {

    this.running = true;

    this.api.runChecks()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Data quality:',
            response
          );

          this.running = false;

          this.loadResults();

        },

        error: (error) => {

          console.error(error);

          this.running = false;

        }

      });

  }

}