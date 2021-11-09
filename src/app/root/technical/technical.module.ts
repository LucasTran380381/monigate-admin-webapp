import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReportManagementComponent} from './report-management/report-management.component';

const routes: Routes = [
  {path: 'dashboard', component: ReportManagementComponent},
];

@NgModule({
  declarations: [
    ReportManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class TechnicalModule {}
