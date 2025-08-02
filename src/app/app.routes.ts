import { Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/component/login.component';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { DocumentationComponent } from './documentation/component/documentation.component';
import { AssetControlFormsComponent } from './asset_control_forms/component/asset_control_forms.component';



export const appRoutes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full'},
 { path: 'login', component: LoginComponent},
 { path: 'dashboard', component: DashboardComponent}, //, canActivate: [AuthGuard]
 { path: 'documentation', component: DocumentationComponent},
 { path: 'asset-control-forms', component: AssetControlFormsComponent},




];
