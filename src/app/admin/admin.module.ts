import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserManagementComponent} from './user-management/user-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {UserManipulation} from './user-manipulation/user-manipulation.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {DepartmentManagementComponent} from './department-management/department-management.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ImportDepartmentComponent} from './import-department/import-department.component';
import {MatStepperModule} from '@angular/material/stepper';
import {DepartmentManipulationComponent} from './department-manipulation/department-manipulation.component';
import {ImportUserComponent} from './import-user/import-user.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
  {path: 'user-management', component: UserManagementComponent},
  {path: '', redirectTo: 'user-management', pathMatch: 'full'},
  {path: 'department-management', component: DepartmentManagementComponent},

]

@NgModule({
  declarations: [
    UserManagementComponent,
    UserManipulation,
    DepartmentManagementComponent,
    ImportDepartmentComponent,
    ImportUserComponent,
    DepartmentManipulationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    FormsModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatTooltipModule,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
})
export class AdminModule {}