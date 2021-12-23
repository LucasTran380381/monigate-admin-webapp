import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from "./root/root.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from '../guards/auth.guard';
import {AuthorizationGuard} from '../guards/authorization.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: RootComponent, children: [
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthorizationGuard],
        data: {
          role: 'Admin',
        },
      },
      {
        path: 'technical',
        loadChildren: () => import('./technical/technical.module').then(m => m.TechnicalModule),
        canActivate: [AuthorizationGuard],
        data: {
          role: 'Technical Moderator',
        },
      }, {
        path: 'manager',
        loadChildren: () => import('../department-manager/department-manager.module').then(m => m.DepartmentManagerModule),
        canActivate: [AuthorizationGuard],
        data: {
          role: 'Department Manager',
        },
      },
      {path: '', redirectTo: 'admin', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {
}
