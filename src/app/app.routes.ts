import { Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/component/login.component';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { DocumentationComponent } from './documentation/component/documentation.component';
import { AssetControlFormsComponent } from './asset_control_forms/component/asset_control_forms.component';
import { HousekeepingComponent } from './housekeeping/component/housekeeping.component';
import { LaunchProcessComponent } from './launch-process/component/launch-process.component';
import { ProcessVisualizationComponent } from './process-visualization/component/process-visualization.component';

import { DataExplorerComponent } from './data-explorer/component/data-explorer.component';
import { UploadDataComponent } from './upload-data/component/upload-data.component';
import { DataQualityComponent } from './data-quality/component/data-quality.component';
import { ReportingComponent } from './audit-reporting/component/audit-reporting.component';


export const appRoutes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent},
 { path: 'dashboard', component: DashboardComponent}, //, canActivate: [AuthGuard]
 { path: 'documentation', component: DocumentationComponent},
 { path: 'asset-control-forms', component: AssetControlFormsComponent},
 { path: 'housekeeping', component: HousekeepingComponent},
 { path: 'launch-process', component: LaunchProcessComponent},
 { path: 'process-visualization', component: ProcessVisualizationComponent},
 { path: 'data-explorer', component: DataExplorerComponent },
 { path: 'upload-data', component: UploadDataComponent },
 { path: 'data-quality', component: DataQualityComponent },
 { path: 'audit-reporting', component: ReportingComponent }



];


export const routes = [
    // Define your routes here
  ];