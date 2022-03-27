import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../models/department";
import {DepartmentService} from "../../../service/department.service";
import {Programmer} from "../../../models/programmer";
import {ProgrammerService} from "../../../service/programmer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../service/project.service";
import {LeadService} from "../../../service/lead.service";
import {Project} from "../../../models/project";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";
import {Subscription, timeout} from "rxjs";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.sass']
})
export class DepartmentFormComponent implements OnInit  {

  pageTitle = 'Department Edit';
  errorMessage = '';

  form_dept: FormGroup;
  programmers: Programmer[];
  all_programmers: Programmer[];
  projects: Project[];
  sub: Subscription;


  id: number;
  department: Department | null;
  project: Project;

  dropdownList: any[];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm: FormGroup;

  programmer_ids: number[];

  constructor(private deptService: DepartmentService,
              private progerService: ProgrammerService,
              private projectService: ProjectService,
              private leadService: LeadService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {

    this.form_dept = new FormGroup({
      name: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      project_id: new FormControl('', [Validators.required]),
    });

    this.sub = this.deptService.selectedDepartmentChanges$.subscribe(
      currentDepartment => this.displayDepartment(currentDepartment)
    );



    this.getProgrammers();
    this.getProjects();

  }

  private getProgrammers() {
    this.progerService.getAllProgrammers().subscribe((data: Programmer[]) => {
      if (data) {
        this.all_programmers = data;

        this.populateDropdown(this.all_programmers);

        this.dropdownSettings = {
          idField: 'item_id',
          textField: 'item_text',
          allowSearchFilter: true
        }
      }
    });
  }

  populateDropdown(programmers: Programmer[]) {
    this.dropdownList = [];
    for (const programmer of programmers) {
      this.dropdownList.push({item_id: programmer.id, item_text: programmer.firstName + " " + programmer.lastName});
    }
  }

  private getProjects() {
    this.projectService.getProjects().subscribe((data: any) => {
      if(data){
        this.projects = data;
      }
    })
  }

  // private getLead() {
  //   this.leadService.getLead().subscribe((data) -> {
  //     this.programmers = data;
  //   })
  // }


  onSubmit() {
    // if (this.form_dept.invalid) {
    //   console.log('INVALID');
    //   return;
    // }
    //
    // Object.assign(this.department, this.form_dept.value);
    // this.department.programmerIds = this.programmer_ids;
    //
    // console.log(this.department);
    // //
    // if (this.id) {
    //   this.updateDepartment();
    // } else {
    //   this.storeDepartment();
    // }

  }

  // private getDepartment() {
  //   console.log(this.id);
  //   if (this.id) {
  //     this.deptService.getDepartment(this.id).subscribe((data: any) => {
  //       if(data.project[0]){
  //         this.project = data.project[0];
  //       }
  //       if(data.programmers){
  //         this.programmers = data.programmers;
  //       }
  //       this.department = data.department;
  //
  //       this.form_dept.patchValue({
  //         'name': this.department?.name,
  //         'language': this.department?.language,
  //         'project_id': this.project.id
  //       });
  //
  //
  //       this.selectedItems = [];
  //
  //       for (const programmer of this.programmers) {
  //         this.selectedItems.push({
  //           item_id: programmer.id,
  //           item_text: programmer.firstName + " " + programmer.lastName
  //         })
  //         this.programmer_ids.push(programmer.id);
  //       }
  //
  //       this.dropDownForm.patchValue({
  //         'progs': this.selectedItems
  //       });
  //
  //
  //     })
  //   }
  // }

  // private updateDepartment() {
  //   this.deptService.updateDepartment(this.department).subscribe((data) => {
  //     if (data) {
  //       this.router.navigate(['']);
  //     }
  //   });
  // }
  //
  // private storeDepartment() {
  //   this.deptService.storeDepartment(this.department).subscribe((data) => {
  //     if (data) {
  //       this.router.navigate(['']);
  //     }
  //   });
  // }

  onItemSelect(item: any) {
    this.programmer_ids.push(item.item_id);
  }

  onItemDeSelect(item: any) {
    this.programmer_ids.splice(this.programmer_ids.indexOf(item.item_id), 1);
  }

  onSelectAll(items: any) {
    this.programmer_ids = [];
    items.map((item: any) => {
      this.programmer_ids.push(item.item_id);
    });
    console.log(this.programmer_ids);
  }

  onUnSelectAll() {
    this.programmer_ids = [];
  }

  get f() {
    return this.form_dept.controls;
  }





  displayDepartment(department: Department | null): void {

    this.department = department;

    if (department) {
      this.form_dept.reset();
      this.onUnSelectAll();
      this.selectedItems = [];

      if (department.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${department.name}`;

      }
      // Update the data on the form

      this.form_dept.patchValue({
        'name': this.department?.name,
        'language': this.department?.language,
        'project_id': this.project.id
      });

      for (const programmer of this.programmers) {
        this.selectedItems.push({
          item_id: programmer.id,
          item_text: programmer.firstName + " " + programmer.lastName
        })
        this.programmer_ids.push(programmer.id);
        timeout(100);
      }

      this.dropDownForm.patchValue({
        'progs': this.selectedItems
      });

    }
  }


  cancelEdit(department: Department): void {

    this.displayDepartment(department);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
