/*import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];

*/

import { NgModule } from "@angular/core";
import { RouterModule, } from "@angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

export const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch:'full'},
  {path: 'list', component: AppComponent},
  {path: 'add', component: AppComponent},
  {path: 'edit/:id', component: AppComponent},
  {path: 'delete/:id', component: AppComponent},
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }



