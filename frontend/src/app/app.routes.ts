import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'planillas',
        loadComponent: () =>
          import('./features/payroll/payroll-list/payroll-list.component').then(m => m.PayrollListComponent)
      },
      {
        path: 'planillas/:id',
        loadComponent: () =>
          import('./features/payment-batches/batch-detail/batch-detail.component').then(m => m.BatchDetailComponent)
      },
      {
        path: 'dispersiones',
        loadComponent: () =>
          import('./features/dispersions/dispersions-list/dispersions-list.component').then(m => m.DispersionsListComponent)
      },
      {
        path: 'dispersiones/:id',
        loadComponent: () =>
          import('./features/payment-batches/batch-detail/batch-detail.component').then(m => m.BatchDetailComponent)
      },
      {
        path: 'operaciones',
        loadComponent: () =>
          import('./features/operations/operations/operations.component').then(m => m.OperationsComponent)
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./features/employees/employees-list/employees-list.component').then(m => m.EmployeesListComponent)
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./features/vendors/vendors-list/vendors-list.component').then(m => m.VendorsListComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
