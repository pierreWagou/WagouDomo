import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component'
import {SingleAppareilComponent} from './single-appareil/single-appareil.component'
import {EditAppareilComponent} from './edit-appareil/edit-appareil.component'
import {UserListComponent} from './user-list/user-list.component'
import {NewUserComponent} from './new-user/new-user.component'
import {Error404Component} from './error404/error404.component'
import {AuthGuard} from './services/auth-guard.service'

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponent},
  {path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent},
  {path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AppareilViewComponent},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
