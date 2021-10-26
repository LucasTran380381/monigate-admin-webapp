import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {RootComponent} from "./root/root.component";

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      {path: 'dashboard', component: ChildComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {
}
