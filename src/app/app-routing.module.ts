import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { LoginComponent } from './Pages/login/login.component';
import { UserListComponent } from './Pages/container/user-list/user-list.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { AboutComponent } from './Pages/about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { FinanceComponent } from './Finance/finance/finance.component';
import { UserDetailComponent } from './Pages/container/user-detail/user-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';

const routes: Routes = [

  {path:'', component:HomeComponent, title:'Home'},
  
  {path:'about', component:AboutComponent, title:'About'},
  {path:'contact', component:ContactComponent, title:'ContactUs'},
  {path:'login', component:LoginComponent, title:'Login'},
  {path:'register', component:RegisterComponent, title:'Register'},
  {path:'user', component:UserListComponent, title:'User',},
  {path:'manager', component:ManagerComponent, title:'Manager'},
  {path:'admin', component:UserListComponent, title:'Admin'},
  {path:'manager-list', component:ManagerListComponent, title:'Manager-List',},
  {path: 'profile', component: ProfileComponent, title: 'Profile'},
  {path: 'manager-login', component: ManagerLoginComponent, title: 'Manager-Login'},
  {path: 'user-login', component: UserLoginComponent, title: 'User-Login'},
  {path: 'finance', component: FinanceComponent, title: 'Finance'},
  
  {path:'user-detail/:id',component: UserDetailComponent, title: 'User-detail'},
  {path:'projects',component:CreateProjectComponent},
  {path:'**', component:NotfoundComponent, title:'Error'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
