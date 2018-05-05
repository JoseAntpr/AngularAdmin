import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DetailComponent } from './components/detail/detail.component';

import { AuthGuard } from './authentication/guards/auth.guard';
import { AuthorizedGuard } from './authentication/guards/authorized.guard';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new', component: UserFormComponent, canActivate: [AuthGuard]},
  { path: 'edit/:id', component: UserFormComponent, canActivate: [AuthGuard, AuthorizedGuard]},
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(routes);
