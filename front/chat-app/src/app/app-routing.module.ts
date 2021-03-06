import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAccountComponent } from './login-with-account/login-with-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ChatComponent } from './chat/chat.component';



const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'login', component: LoginWithAccountComponent},
  // {path : 'chat', component: ChatComponent}, //TODO : Passer cette ligne en commentaire et activer celle en dessous
  {path: 'chat', canActivate: [AuthGuard],component: ChatComponent},
  {path: 'register', component: CreateAccountComponent},
  {path: 'profile', component: UserProfileComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
