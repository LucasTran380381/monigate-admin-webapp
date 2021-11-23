import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReportManagementComponent} from './report-management/report-management.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {IssueDetailComponent} from './issue-detail/issue-detail.component';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {path: 'report-management', component: ReportManagementComponent},
  {path: '', redirectTo: 'report-management', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    ReportManagementComponent,
    IssueDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class TechnicalModule {}
