import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/component/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/component/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./documentation/component/documentation.component').then(m => m.DocumentationComponent)
  },
  {
    path: 'asset-control-forms',
    loadComponent: () =>
      import('./asset_control_forms/component/asset_control_forms.component').then(m => m.AssetControlFormsComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
