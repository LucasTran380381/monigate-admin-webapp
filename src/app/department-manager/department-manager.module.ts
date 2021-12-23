import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffManagementComponent} from './staff-management/staff-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {StaffDetailComponent} from './staff-detail/staff-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

const routes: Routes = [
  {path: 'staff-management', component: StaffManagementComponent},
  {path: '', redirectTo: 'staff-management', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    StaffManagementComponent,
    StaffDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
  ],
})
export class DepartmentManagerModule {}