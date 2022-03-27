import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DepartmentShellComponent} from "./department-shell/department-shell.component";
import {DepartmentListComponent} from "./department-list/department-list.component";
import {DepartmentFormComponent} from "./department-form/department-form.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {SharedModule} from "../../shared/shared.module";

const departmentRoutes: Routes = [
  { path: '', component: DepartmentShellComponent }
];

@NgModule({
  declarations: [
    DepartmentShellComponent,
    DepartmentListComponent,
    DepartmentFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(departmentRoutes),
    NgMultiSelectDropDownModule
  ]
})
export class DepartmentModule { }
