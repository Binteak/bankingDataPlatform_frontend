import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import {
  ConfirmationService,
  MessageService
} from 'primeng/api';

import { HousekeepingService } from '../service/housekeeping.service';


@Component({
  standalone: true,

  selector: 'app-housekeeping',

  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    DividerModule,
    ConfirmDialogModule,
    ToastModule
  ],

  providers: [
    ConfirmationService,
    MessageService
  ],

  templateUrl: './housekeeping.component.html',

  styleUrls: [
    './housekeeping.component.css'
  ]
})


export class HousekeepingComponent
  implements OnInit {


  records: any[] = [];

  selectedRecords: any[] = [];

  loading = false;


  // ============================================================
  // DYNAMIC FILTERS
  // ============================================================

  reportingDates: any[] = [];

  countries: any[] = [];

  portfolios: any[] = [];

  productTypes: any[] = [];

  riskStages: any[] = [];

  ratings: any[] = [];

  dataSources: any[] = [];


  // ============================================================
  // FILTER VALUES
  // ============================================================

  filters = {

    reporting_date: '',

    entity_id: '',

    entity_name: '',

    country: '',

    portfolio: '',

    product_type: '',

    risk_stage: '',

    rating: '',

    default_flag: '',

    data_source: ''

  };


  // ============================================================
  // DEFAULT FILTER
  // ============================================================

  defaultOptions = [

    {
      label: 'All',
      value: ''
    },

    {
      label: 'Default',
      value: 'true'
    },

    {
      label: 'Not Default',
      value: 'false'
    }

  ];


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(

    private api: HousekeepingService,

    private confirmationService:
      ConfirmationService,

    private messageService:
      MessageService

  ) {}


  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {

    this.search();

  }


  // ============================================================
  // SEARCH
  // ============================================================

  search(): void {

    this.loading = true;

    this.selectedRecords = [];

    this.api.search(
      this.filters
    ).subscribe({

      next: (response: any) => {

        this.records =
          response?.data ?? [];


        // --------------------------------------------------------
        // DYNAMIC FILTERS
        // --------------------------------------------------------

        this.buildReportingDates(
          response?.filters?.reporting_dates
        );

        this.buildCountries(
          response?.filters?.countries
        );

        this.buildPortfolios(
          response?.filters?.portfolios
        );

        this.buildProductTypes(
          response?.filters?.product_types
        );

        this.buildRiskStages(
          response?.filters?.risk_stages
        );

        this.buildRatings(
          response?.filters?.ratings
        );

        this.buildDataSources(
          response?.filters?.data_sources
        );


        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.records = [];

        this.loading = false;

        this.messageService.add({

          severity: 'error',

          summary: 'Error',

          detail:
            'Unable to retrieve records.'

        });

      }

    });

  }


  // ============================================================
  // REPORTING DATES
  // ============================================================

  buildReportingDates(
    dates: any[] = []
  ): void {

    this.reportingDates = dates
      .filter(date => date)
      .map(date => {

        const formattedDate =
          new Date(date).toLocaleDateString(
            'en-GB'
          );

        return {

          label: formattedDate,

          value: date

        };

      });


    this.reportingDates.unshift({

      label: 'All dates',

      value: ''

    });

  }


  // ============================================================
  // COUNTRIES
  // ============================================================

  buildCountries(
    countries: any[] = []
  ): void {

    this.countries = [

      {
        label: 'All',
        value: ''
      },

      ...countries
        .filter(country => country)
        .map(country => ({

          label: country,

          value: country

        }))

    ];

  }


  // ============================================================
  // PORTFOLIOS
  // ============================================================

  buildPortfolios(
    portfolios: any[] = []
  ): void {

    this.portfolios = [

      {
        label: 'All',
        value: ''
      },

      ...portfolios
        .filter(portfolio => portfolio)
        .map(portfolio => ({

          label: portfolio,

          value: portfolio

        }))

    ];

  }


  // ============================================================
  // PRODUCT TYPES
  // ============================================================

  buildProductTypes(
    products: any[] = []
  ): void {

    this.productTypes = [

      {
        label: 'All',
        value: ''
      },

      ...products
        .filter(product => product)
        .map(product => ({

          label: product,

          value: product

        }))

    ];

  }


  // ============================================================
  // RISK STAGES
  // ============================================================

  buildRiskStages(
    stages: any[] = []
  ): void {

    this.riskStages = [

      {
        label: 'All',
        value: ''
      },

      ...stages
        .filter(stage => stage)
        .map(stage => ({

          label: stage,

          value: stage

        }))

    ];

  }


  // ============================================================
  // RATINGS
  // ============================================================

  buildRatings(
    ratings: any[] = []
  ): void {

    this.ratings = [

      ...ratings
        .filter(rating => rating)
        .map(rating => ({

          label: rating,

          value: rating

        }))

    ];

  }


  // ============================================================
  // DATA SOURCES
  // ============================================================

  buildDataSources(
    sources: any[] = []
  ): void {

    this.dataSources = [

      {
        label: 'All',
        value: ''
      },

      ...sources
        .filter(source => source)
        .map(source => ({

          label: source,

          value: source

        }))

    ];

  }


  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  clearFilters(): void {

    this.filters = {

      reporting_date: '',

      entity_id: '',

      entity_name: '',

      country: '',

      portfolio: '',

      product_type: '',

      risk_stage: '',

      rating: '',

      default_flag: '',

      data_source: ''

    };

    this.search();

  }


  // ============================================================
  // DELETE SELECTED
  // ============================================================

  deleteSelected(): void {

    if (
      this.selectedRecords.length === 0
    ) {

      return;

    }


    const count =
      this.selectedRecords.length;


    this.confirmationService.confirm({

      message:
        `Are you sure you want to delete ${count} selected record(s)?`,

      header:
        'Confirm deletion',

      icon:
        'pi pi-exclamation-triangle',

      acceptButtonStyleClass:
        'p-button-danger',

      rejectButtonStyleClass:
        'p-button-secondary',

      accept: () => {


        const ids =
          this.selectedRecords.map(
            record => record.id
          );


        this.loading = true;


        this.api.deleteRecords(
          ids
        ).subscribe({

          next: (response: any) => {

            this.loading = false;

            this.selectedRecords = [];


            this.messageService.add({

              severity: 'success',

              summary: 'Deleted',

              detail:
                `${response.recordsDeleted} record(s) deleted.`

            });


            this.search();

          },


          error: (error) => {

            this.loading = false;


            this.messageService.add({

              severity: 'error',

              summary: 'Error',

              detail:
                error?.error?.message ??
                'Unable to delete records.'

            });

          }

        });

      }

    });

  }

}