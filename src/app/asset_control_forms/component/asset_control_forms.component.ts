import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

import { AssetControlFormsService } from '../service/asset_control_forms.service';

interface Date {
  date: string;
}

interface Table {
  inputId: string;
  valueDate: string;
  scenarioId: string;
  username: string;
  filename: string;
  lastUpdate: string;
  status: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({

  standalone: true,
  selector: 'app-assetcontrolforms',
  imports: [CardModule, CommonModule, ButtonModule, DividerModule, PanelMenuModule, FormsModule, FloatLabelModule, DropdownModule, InputTextModule, MessagesModule, FileUploadModule, ToastModule, HttpClientModule, TableModule],
  templateUrl: './asset_control_forms.component.html',
  styleUrls: ['./asset_control_forms.component.css'],
})



export class AssetControlFormsComponent implements OnInit {

  //Modulo Scenario Creation
  showAlert: boolean = false;
  dates: Date[] | undefined;
  selectedDate: Date | undefined;
  scenario: string | undefined;
  placeholderScenario: string = 'EBA20_STRESS';

  //Modulo File Upload
  uploadedFiles: any[] = [];

  //Modulo Last Uploads
  tableData: any[] = [];

  constructor(private _api: AssetControlFormsService) { }

  ngOnInit() {

    this.getValueDates();
    this.getDataTable();

  }

  getValueDates() {

    let body = {
      'screenName': 'dashboard',
    };


    this._api.getValueDates(body).subscribe(
      (res: any) => {
        this.dates = JSON.parse(res.data);
        console.log('test dates: ', this.dates);
      }
    );


  }

  getDataTable() {

    let body = {
      'screenName': 'dashboard',
    };

    this._api.getDataTable(body).subscribe(
      (res: any) => {
        this.tableData = JSON.parse(res.data);
        console.log('test tableData: ', this.tableData);
      }
    );
  }

  //Mostrar alerta de Scenario
  addMessages() {
    this.showAlert = true;
    //Si scenario está vacío, usa el placeholder
    if (!this.scenario || this.scenario.trim() === '') {
      this.scenario = this.placeholderScenario;
    };
  }

  buttonInfo() {
    console.log("Por qué ha fallado");
  }

  // onUpload(event: any) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   console.log(event);
  // }

  onUpload(event: any) {
    for (let file of event.files) {
      // Usamos el valor seleccionado del frontend
      const selectedDate = this.selectedDate?.date ?? '';
      const scenario = this.scenario ?? this.placeholderScenario;
  
      this._api.uploadCSV(file, selectedDate, scenario).subscribe({
        next: (res) => {
          console.log('Archivo y datos recibidos correctamente:', res);
          // if (res.data) {
          //   this.tableData = res.data; // Mostrar el DataFrame en tabla si quieres
          // }
        },
        error: (err) => {
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }

  onClear() {
    this.uploadedFiles = [];
    console.log('File upload cleared');
  }

  onRemove(event: any) {
    this.uploadedFiles = []
  }


}


    // this.tableData = [
    //   { inputId: '1', valueDate: '2024-06-30', scenarioId: 'EBA20_STRESS', username: 'user1', filename: 'file1.csv', lastUpdate: '2024-07-01 10:00', status: 'File name not allowed' },
    //   { inputId: '2', valueDate: '2024-06-30', scenarioId: 'EBA20_STRESS', username: 'user2', filename: 'file2.csv', lastUpdate: '2024-07-01 11:00', status: 'INSERTED' },
    //   { inputId: '3', valueDate: '2024-06-30', scenarioId: 'EBA20_STRESS', username: 'user3', filename: 'file3.csv', lastUpdate: '2024-07-01 12:00', status: 'FAILED' },
    //   { inputId: '4', valueDate: '2024-03-31', scenarioId: 'EBA20_STRESS', username: 'user4', filename: 'file4.csv', lastUpdate: '2024-04-01 10:00', status: 'INSERTED' },
    //   { inputId: '5', valueDate: '2024-03-31', scenarioId: 'EBA20_STRESS', username: 'user5', filename: 'file5.csv', lastUpdate: '2024-04-01 11:00', status: 'INSERTED' },
    //   { inputId: '6', valueDate: '2024-03-31', scenarioId: 'EBA20_STRESS', username: 'user6', filename: 'file6.csv', lastUpdate: '2024-04-01 12:00', status: 'FAILED' },
    //   { inputId: '7', valueDate: '2023-12-31', scenarioId: 'EBA20_STRESS', username: 'user7', filename: 'file7.csv', lastUpdate: '2024-01-01 10:00', status: 'INSERTED' },
    //   { inputId: '8', valueDate: '2023-12-31', scenarioId: 'EBA20_STRESS', username: 'user8', filename: 'file8.csv', lastUpdate: '2024-01-01 11:00', status: 'INSERTED' },
    //   { inputId: '9', valueDate: '2023-12-31', scenarioId: 'EBA20_STRESS', username: 'user9', filename: 'file9.csv', lastUpdate: '2024-01-01 12:00', status: 'FAILED' },
    //   { inputId: '10', valueDate: '2023-09-30', scenarioId: 'EBA20_STRESS', username: 'user10', filename: 'file10.csv', lastUpdate: '2023-10-01 10:00', status: 'INSERTED' },
    //   { inputId: '11', valueDate: '2023-09-30', scenarioId: 'EBA20_STRESS', username: 'user11', filename: 'file11.csv', lastUpdate: '2023-10-01 11:00', status: 'INSERTED' },
    // ]

      // this.dates = [
    //   { date: '2024-06-30' },
    //   { date: '2024-03-31' },
    //   { date: '2023-12-31' },
    //   { date: '2023-09-30' },
    //   { date: '2023-06-30' }
    // ];