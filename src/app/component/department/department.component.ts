import { Component, OnInit } from '@angular/core';
import {Department} from "../../models/department";
import {DepartmentService} from "../../service/department.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.sass']
})
export class DepartmentComponent implements OnInit {

  departments: Department[];
  constructor(private deptService : DepartmentService) { }

  ngOnInit(): void {

    this.getAllDepartments();
  }

  private getAllDepartments() {
    this.deptService.getAllDepartments().subscribe((data)=> {
      this.departments = data;
    })
  }
}
