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
import {MatDividerModule} from '@angular/material/divider';
import {CheckinStatisticsComponent} from './checkin-statistics/checkin-statistics.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgChartsModule} from 'ng2-charts';
import {CardInfoComponent} from './card-info/card-info.component';
import {MatChipsModule} from '@angular/material/chips';
import {IssueTagComponent} from './issue-tag/issue-tag.component';

const routes: Routes = [
  {path: 'report-management', component: ReportManagementComponent},
  {path: '', redirectTo: 'report-management', pathMatch: 'full'},
  {path: 'checkin-statistics', component: CheckinStatisticsComponent},
];

@NgModule({
  declarations: [
    ReportManagementComponent,
    IssueDetailComponent,
    CheckinStatisticsComponent,
    CardInfoComponent,
    IssueTagComponent,
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
    MatDividerModule,
    MatTooltipModule,
    NgChartsModule,
    MatChipsModule,
  ],
})
export class TechnicalModule {}
