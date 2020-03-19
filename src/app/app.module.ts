import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthService } from './services/auth.service';
import { RequestInterceptor } from './helpers/request-iterceptor';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    OrderComponent,
    SignupComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'admin', component: AdminComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
        { path: 'admin/orders', component: OrderComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
        { path: 'login', component: LoginComponent },
        { path: 'no-access', component: NoAccessComponent }
      ]
    )
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    OrderService,

    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
