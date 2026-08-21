import { Component, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { DataExplorerService } from '../service/data-explorer.service';


interface RiskExposure {

  id: number;

  reportingDate: string;

  entityId: string;

  entityName: string;

  country: string;

  portfolio: string;

  productType: string;

  exposureAmount: number;

  eadAmount: number;

  pd: number;

  lgd: number;

  riskStage: string;

  rating: string;

  defaultFlag: boolean;

  defaultDate: string | null;

  currency: string;

  dataSource: string;

}


@Component({

  standalone: true,

  selector: 'app-data-explorer',

  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    HttpClientModule,
    DropdownModule,
    FormsModule
  ],

  templateUrl: './data-explorer.component.html',

  styleUrls: ['./data-explorer.component.css']

})


export class DataExplorerComponent implements OnInit {


  // ==========================================================
  // DATA
  // ==========================================================

  tableData: RiskExposure[] = [];

  filteredData: RiskExposure[] = [];

  loading: boolean = false;

  errorMessage: string = '';


  // ==========================================================
  // FILTERS
  // ==========================================================

  searchText: string = '';

  selectedReportingDate: string = '';

  selectedCountry: string = '';

  selectedPortfolio: string = '';

  selectedProductType: string = '';

  selectedRiskStage: string = '';

  selectedRating: string = '';

  selectedDefault: string = '';

  selectedDataSource: string = '';


  // ==========================================================
  // FILTER OPTIONS
  // ==========================================================

  reportingDates: string[] = [];

  countries: string[] = [];

  portfolios: string[] = [];

  productTypes: string[] = [];

  riskStages: string[] = [];

  ratings: string[] = [];

  dataSources: string[] = [];


  defaultOptions = [
    {
      label: 'Default',
      value: 'true'
    },
    {
      label: 'Non Default',
      value: 'false'
    }
  ];


  constructor(
    private _api: DataExplorerService
  ) {}


  ngOnInit(): void {

    this.getDataTable();

  }


  // ==========================================================
  // LOAD DATA
  // ==========================================================

  getDataTable(): void {

    this.loading = true;

    this.errorMessage = '';


    this._api.getDataTable().subscribe({

      next: (res: any) => {

        console.log('Data Explorer response:', res);


        if (res.status === 'success') {

          this.tableData = res.data;

          this.filteredData = [...this.tableData];

          this.buildFilterOptions();

        } else {

          this.errorMessage =
            res.message || 'Unable to load data.';

        }


        this.loading = false;

      },

      error: (error) => {

        console.error(
          'Error loading Data Explorer:',
          error
        );

        this.errorMessage =
          'Unable to load risk exposure data.';

        this.loading = false;

      }

    });

  }


  // ==========================================================
  // BUILD FILTER OPTIONS
  // ==========================================================

  buildFilterOptions(): void {

    this.reportingDates = this.getUniqueValues(
      this.tableData.map(x => x.reportingDate)
    );

    this.countries = this.getUniqueValues(
      this.tableData.map(x => x.country)
    );

    this.portfolios = this.getUniqueValues(
      this.tableData.map(x => x.portfolio)
    );

    this.productTypes = this.getUniqueValues(
      this.tableData.map(x => x.productType)
    );

    this.riskStages = this.getUniqueValues(
      this.tableData.map(x => x.riskStage)
    );

    this.ratings = this.getUniqueValues(
      this.tableData.map(x => x.rating)
    );

    this.dataSources = this.getUniqueValues(
      this.tableData.map(x => x.dataSource)
    );

  }


  getUniqueValues(values: any[]): string[] {

    return values
      .filter(value => value !== null && value !== undefined && value !== '')
      .map(value => String(value))
      .filter(
        (value, index, self) =>
          self.indexOf(value) === index
      )
      .sort();

  }


  // ==========================================================
  // APPLY FILTERS
  // ==========================================================

  applyFilters(): void {

    const search = this.searchText
      .trim()
      .toLowerCase();


    this.filteredData = this.tableData.filter(row => {


      // General search

      const matchesSearch =
        !search ||
        row.entityId?.toLowerCase().includes(search) ||
        row.entityName?.toLowerCase().includes(search) ||
        row.country?.toLowerCase().includes(search) ||
        row.portfolio?.toLowerCase().includes(search) ||
        row.productType?.toLowerCase().includes(search) ||
        row.rating?.toLowerCase().includes(search) ||
        row.dataSource?.toLowerCase().includes(search);


      // Reporting date

      const matchesDate =
        !this.selectedReportingDate ||
        row.reportingDate === this.selectedReportingDate;


      // Country

      const matchesCountry =
        !this.selectedCountry ||
        row.country === this.selectedCountry;


      // Portfolio

      const matchesPortfolio =
        !this.selectedPortfolio ||
        row.portfolio === this.selectedPortfolio;


      // Product

      const matchesProduct =
        !this.selectedProductType ||
        row.productType === this.selectedProductType;


      // Risk stage

      const matchesStage =
        !this.selectedRiskStage ||
        row.riskStage === this.selectedRiskStage;


      // Rating

      const matchesRating =
        !this.selectedRating ||
        row.rating === this.selectedRating;


      // Default

      const matchesDefault =
        !this.selectedDefault ||
        String(row.defaultFlag) === this.selectedDefault;


      // Data source

      const matchesSource =
        !this.selectedDataSource ||
        row.dataSource === this.selectedDataSource;


      return (
        matchesSearch &&
        matchesDate &&
        matchesCountry &&
        matchesPortfolio &&
        matchesProduct &&
        matchesStage &&
        matchesRating &&
        matchesDefault &&
        matchesSource
      );

    });

  }


  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  clearFilters(): void {

    this.searchText = '';

    this.selectedReportingDate = '';

    this.selectedCountry = '';

    this.selectedPortfolio = '';

    this.selectedProductType = '';

    this.selectedRiskStage = '';

    this.selectedRating = '';

    this.selectedDefault = '';

    this.selectedDataSource = '';

    this.filteredData = [...this.tableData];

  }


  // ==========================================================
  // REFRESH
  // ==========================================================

  refreshData(): void {

  // Limpiar filtros
  this.searchText = '';
  this.selectedReportingDate = '';
  this.selectedCountry = '';
  this.selectedPortfolio = '';
  this.selectedProductType = '';
  this.selectedRiskStage = '';
  this.selectedRating = '';
  this.selectedDefault = '';
  this.selectedDataSource = '';

  // Recargar datos
  this.getDataTable();

}


  // ==========================================================
  // SUMMARY
  // ==========================================================

  get totalRecords(): number {

    return this.filteredData.length;

  }


  get defaultedRecords(): number {

    return this.filteredData.filter(
      row => row.defaultFlag
    ).length;

  }


  get totalExposure(): number {

    return this.filteredData.reduce(
      (total, row) =>
        total + Number(row.exposureAmount || 0),
      0
    );

  }


  get totalEad(): number {

    return this.filteredData.reduce(
      (total, row) =>
        total + Number(row.eadAmount || 0),
      0
    );

  }


  // ==========================================================
  // EXPORT CSV
  // ==========================================================

  exportCSV(): void {

    if (!this.filteredData.length) {

      return;

    }


    const headers = [
      'ID',
      'Reporting Date',
      'Entity ID',
      'Entity Name',
      'Country',
      'Portfolio',
      'Product Type',
      'Exposure Amount',
      'EAD Amount',
      'PD',
      'LGD',
      'Risk Stage',
      'Rating',
      'Default',
      'Default Date',
      'Currency',
      'Data Source'
    ];


    const rows = this.filteredData.map(row => [

      row.id,
      row.reportingDate,
      row.entityId,
      row.entityName,
      row.country,
      row.portfolio,
      row.productType,
      row.exposureAmount,
      row.eadAmount,
      row.pd,
      row.lgd,
      row.riskStage,
      row.rating,
      row.defaultFlag,
      row.defaultDate || '',
      row.currency,
      row.dataSource

    ]);


    const csvContent = [

      headers.join(','),

      ...rows.map(row =>
        row
          .map(value => this.escapeCSV(value))
          .join(',')
      )

    ].join('\n');


    const blob = new Blob(
      [csvContent],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download =
      `risk_exposures_${this.getFileDate()}.csv`;

    link.click();

    URL.revokeObjectURL(url);

  }


  escapeCSV(value: any): string {

    if (value === null || value === undefined) {

      return '';

    }


    const stringValue = String(value);


    if (
      stringValue.includes(',') ||
      stringValue.includes('"') ||
      stringValue.includes('\n')
    ) {

      return `"${stringValue.replace(/"/g, '""')}"`;

    }


    return stringValue;

  }


  getFileDate(): string {

    const date = new Date();

    return date
      .toISOString()
      .substring(0, 10);

  }

}