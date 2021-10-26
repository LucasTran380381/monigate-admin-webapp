import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RootRoutingModule} from './root-routing.module';
import {HomeComponent} from './home/home.component';
import {ChildComponent} from './child/child.component';
import {RootComponent} from './root/root.component';


@NgModule({
  declarations: [
    HomeComponent,
    ChildComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    RootRoutingModule
  ]
})
export class RootModule {
}
