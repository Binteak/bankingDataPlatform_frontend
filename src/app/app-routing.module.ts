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
    path: 'housekeeping',
    loadComponent: () =>
      import('./housekeeping/component/housekeeping.component').then(m => m.HousekeepingComponent)
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
    path: 'launch-process',
    loadComponent: () =>
      import('./launch-process/component/launch-process.component').then(m => m.LaunchProcessComponent)
  },
  {
    path: 'process-visualization',
    loadComponent: () =>
      import('./process-visualization/component/process-visualization.component').then(m => m.ProcessVisualizationComponent)
  },
  // {
  // path: 'data-explorer',
  // loadComponent: () =>
  //   import('./data-explorer/component/data-explorer.component')
  //     .then(m => m.DataExplorerComponent)
  // },
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
