import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DepartmentComponent} from "./component/department/department.component";
import {DepartmentFormComponent} from "./component/department-form/department-form.component";

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent
  },
  {
    path: 'form',
    component: DepartmentFormComponent
  },
  {
    path: 'form/:id',
    component: DepartmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
