import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RootRoutingModule} from './root-routing.module';
import {HomeComponent} from './home/home.component';
import {RootComponent} from './root/root.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckingDetailComponent} from './checking-detail/checking-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from '@angular/material/menu';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    HomeComponent,
    RootComponent,
    DashboardComponent,
    CheckingDetailComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    NgxSliderModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDividerModule,
    MatRippleModule,
  ],
})
export class RootModule {
}
