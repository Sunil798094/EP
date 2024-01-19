import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { NavbarComponent } from './Pages/navbar/navbar.component';
import { ManagerComponent } from './manager/manager.component';
import { ContainerComponent } from './Pages/container/container.component';
import { UserDetailComponent } from './Pages/container/user-detail/user-detail.component';
import { UserListComponent } from './Pages/container/user-list/user-list.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

import { AdminComponent } from './admin/admin.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerDetailsComponent } from './manager-details/manager-details.component';
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { FinanceComponent } from './Finance/finance/finance.component';
import { FinanceService } from './Finance/finance-service.service';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    NavbarComponent,
    ManagerComponent,
    ContainerComponent,
    UserListComponent,
    UserDetailComponent,
    
    AdminComponent,
    ManagerListComponent,
    ManagerDetailsComponent,
    ProfileComponent,
    FinanceComponent,
    ManagerLoginComponent,
    UserLoginComponent,
    CreateProjectComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
    ],
  providers: [ApiService, AuthService, UserService, FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
