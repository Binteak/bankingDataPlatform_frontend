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

//Nos quedamo por la interface, sería terminar el tpescript primero, luego crear el html y depuçes el css

@Component({

  standalone: true,
  selector: 'app-assetcontrolforms',
  imports: [CardModule, CommonModule, ButtonModule, DividerModule, PanelMenuModule],
  templateUrl: './asset_control_forms.component.html',
  styleUrls: ['./asset_control_forms.component.css'],
})



export class AssetControlFormsComponent implements OnInit {

  ngOnInit() {


  }



 

  


}
