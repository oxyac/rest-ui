import { Component, OnInit } from '@angular/core';
import {Department} from "../../../models/department";
import {Subscription} from "rxjs";
import {DepartmentService} from "../../../service/department.service";
import {ProgrammerService} from "../../../service/programmer.service";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.sass']
})
export class DepartmentListComponent implements OnInit {

  pageTitle = 'Products';
  errorMessage: string;

  displayLead: boolean;

  departments: Department[];

  selectedDepartment: Department | null;
  sub: Subscription;



  constructor(private departmentService: DepartmentService,
              private programmerService: ProgrammerService) { }

  ngOnInit(): void {
    this.sub = this.departmentService.selectedDepartmentChanges$.subscribe(
      currentDepartment => this.selectedDepartment = currentDepartment
    );

    this.departmentService.getAllDepartments().subscribe({
      next: (departments: Department[]) => this.departments = departments,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.displayLead = !this.displayLead;
  }

  newDepartment(): void {
    this.departmentService.changeSelectedDepartment(this.departmentService.newDepartment());
  }

  departmentSelected(department: Department): void {
    this.departmentService.changeSelectedDepartment(department);
  }

}
