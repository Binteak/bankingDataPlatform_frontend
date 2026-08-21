import { NgModule } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module'; // <== Aquí
import { HttpClientModule } from '@angular/common/http';


import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Dialog } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { AccordionModule } from 'primeng/accordion';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/component/header.component';
import { DocumentationComponent } from './documentation/component/documentation.component';
import { LoginComponent } from './login/component/login.component';
import { HousekeepingComponent } from './housekeeping/component/housekeeping.component';
import { LaunchProcessComponent } from './launch-process/component/launch-process.component';

import { DataExplorerComponent } from './data-explorer/component/data-explorer.component';

import { ProcessVisualizationComponent } from './process-visualization/component/process-visualization.component';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    HeaderComponent,
    DocumentationComponent,
    HousekeepingComponent,
    LaunchProcessComponent,
    DataExplorerComponent,
    ProcessVisualizationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ButtonModule,
    DialogModule,
    Dialog,
    ScrollPanelModule,
    PanelModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
