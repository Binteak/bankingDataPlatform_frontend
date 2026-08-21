import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

import { UploadDataService } from '../service/upload-data.service';

@Component({
  standalone: true,
  selector: 'app-upload-data',

  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    FileUploadModule
  ],

  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent {

  // ==========================================================
  // FILE
  // ==========================================================

  selectedFile: File | null = null;

  uploadedFileName = '';

  uploading = false;


  // ==========================================================
  // RESULT
  // ==========================================================

  uploadSuccess = false;

  uploadError = false;

  successMessage = '';

  errorMessage = '';

  recordsProcessed = 0;


  // ==========================================================
  // PREVIEW
  // ==========================================================

  previewData: any[] = [];

  previewColumns: string[] = [];


  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================

  constructor(
    private api: UploadDataService
  ) {}


  // ==========================================================
  // FILE SELECTED
  // ==========================================================

  onFileSelected(event: any): void {

    const file: File | undefined = event?.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;

    this.uploadedFileName = file.name;

    this.uploadSuccess = false;
    this.uploadError = false;

    this.successMessage = '';
    this.errorMessage = '';

    this.previewData = [];
    this.previewColumns = [];


    // Solo hacemos preview automático para CSV

    if (file.name.toLowerCase().endsWith('.csv')) {

      this.readCSVPreview(file);

    }

  }


  // ==========================================================
  // CSV PREVIEW
  // ==========================================================

  readCSVPreview(file: File): void {

    const reader = new FileReader();

    reader.onload = (event: any) => {

      const text = event.target.result;

      const lines = text
        .split(/\r?\n/)
        .filter((line: string) => line.trim() !== '');

      if (lines.length === 0) {

        this.previewData = [];
        this.previewColumns = [];

        return;
      }


      // ------------------------------------------------------
      // HEADERS
      // ------------------------------------------------------

      this.previewColumns =
        this.parseCSVLine(lines[0]);


      // ------------------------------------------------------
      // DATA
      // ------------------------------------------------------

      this.previewData = lines
        .slice(1)
        .map((line: string) => {

          const values =
            this.parseCSVLine(line);

          const row: any = {};

          this.previewColumns.forEach(
            (column: string, index: number) => {

              row[column] =
                values[index] ?? '';

            }
          );

          return row;

        });

    };


    reader.onerror = () => {

      this.uploadError = true;

      this.errorMessage =
        'Unable to read the selected CSV file.';

    };


    reader.readAsText(file);

  }


  // ==========================================================
  // CSV PARSER
  // ==========================================================

  parseCSVLine(line: string): string[] {

    const result: string[] = [];

    let current = '';

    let insideQuotes = false;


    for (let i = 0; i < line.length; i++) {

      const char = line[i];


      if (char === '"') {

        insideQuotes = !insideQuotes;

      }

      else if (
        char === ',' &&
        !insideQuotes
      ) {

        result.push(
          current.trim()
        );

        current = '';

      }

      else {

        current += char;

      }

    }


    result.push(
      current.trim()
    );


    return result;

  }


  // ==========================================================
  // PROCESS FILE
  // ==========================================================

  processFile(): void {

    if (!this.selectedFile) {

      this.uploadError = true;

      this.errorMessage =
        'Please select a file first.';

      return;

    }


    this.uploading = true;

    this.uploadSuccess = false;
    this.uploadError = false;

    this.successMessage = '';
    this.errorMessage = '';


    this.api
      .uploadData(this.selectedFile)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Upload response:',
            response
          );


          if (
            response?.status === 'success'
          ) {

            this.uploadSuccess = true;

            this.successMessage =
              response.message ??
              'File processed successfully.';

            this.recordsProcessed =
              response.recordsProcessed ??
              0;

          }

          else {

            this.uploadError = true;

            this.errorMessage =
              response?.message ??
              'The file could not be processed.';

          }


          this.uploading = false;

        },


        error: (error: any) => {

          console.error(
            'Upload error:',
            error
          );


          this.uploadError = true;

          this.errorMessage =
            error?.error?.message ??
            'Error uploading the file.';


          this.uploading = false;

        }

      });

  }


  // ==========================================================
  // CLEAR
  // ==========================================================

  clear(): void {

    this.selectedFile = null;

    this.uploadedFileName = '';

    this.previewData = [];

    this.previewColumns = [];

    this.uploadSuccess = false;

    this.uploadError = false;

    this.successMessage = '';

    this.errorMessage = '';

    this.recordsProcessed = 0;

    this.uploading = false;

  }

}