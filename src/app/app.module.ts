import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { DepartmentComponent } from './component/department/department.component';
import { DepartmentFormComponent } from './component/department/department-form/department-form.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {userReducer} from "./state/user-reducer";
import { DepartmentShellComponent } from './component/department/department-shell/department-shell.component';
import { DepartmentListComponent } from './component/department/department-list/department-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DepartmentComponent,
    HomeComponent,
    LoginComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('users', userReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
