import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DepartmentComponent} from "./component/department/department.component";
import {DepartmentFormComponent} from "./component/department/department-form/department-form.component";
import {DepartmentShellComponent} from "./component/department/department-shell/department-shell.component";

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
    path: 'departments',
    component: DepartmentShellComponent
  },
  {
    path: 'form/:id',
    component: DepartmentFormComponent
  },
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'welcome', component: DepartmentComponent },
      {
        path: 'products',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./component/department/department.module').then(m => m.DepartmentModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
