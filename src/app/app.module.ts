import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from './interceptors/token.interceptor';
import {NgChartsModule} from 'ng2-charts';
import localeGB from '@angular/common/locales/vi';
import {registerLocaleData} from '@angular/common';
import {TimestampPipe} from './pipes/timestamp.pipe';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {MedicalManagerComponent} from './medical-manager/medical-manager.component';
import {MatTableModule} from '@angular/material/table';
import {DiseaseReportDetailComponent} from './disease-report-detail/disease-report-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {IvyGalleryModule} from 'angular-gallery';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {GalleryModule} from 'ng-gallery';
import {LightboxModule} from 'ng-gallery/lightbox';
import {MatMenuModule} from '@angular/material/menu';

registerLocaleData(localeGB);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    TimestampPipe,
    MedicalManagerComponent,
    DiseaseReportDetailComponent,
  ],
  imports: [
    IvyGalleryModule,
    GalleryModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
    FormsModule,
    NgChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), MatTableModule, MatDialogModule, MatDividerModule, MatPaginatorModule, ScrollingModule, LightboxModule, MatMenuModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'vi',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2000, verticalPosition: 'top',
        horizontalPosition: 'right',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
