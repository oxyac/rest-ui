import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../models/department";
import {DepartmentService} from "../../service/department.service";
import {Programmer} from "../../models/programmer";
import {ProgrammerService} from "../../service/programmer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {LeadService} from "../../service/lead.service";
import {Project} from "../../models/project";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {toInteger} from "@ng-bootstrap/ng-bootstrap/util/util";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.sass']
})
export class DepartmentFormComponent implements OnInit {

  form_dept: FormGroup;
  form_progers: FormGroup;
  form_project: FormGroup;
  programmers: Programmer[];
  all_programmers: Programmer[];
  projects: Project[];


  id: number;
  department: Department;
  project: Project;

  dropdownList: any[];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm:FormGroup;

  programmer_ids: number[];

  constructor(private deptService: DepartmentService,
              private progerService: ProgrammerService,
              private projectService: ProjectService,
              private leadService: LeadService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.department = {
      id: 0,
      name: '',
      language: "",
    }
    this.project = {
      id: 0,
      name: '',
      date_start: '',
      is_active: false
    }

    this.programmer_ids = [];
    this.id = activatedRoute.snapshot.params['id'];

    this.dropDownForm =this.fb.group({
      progs: []
    })
  }


  ngOnInit(): void {

    this.getProgrammers();
    this.getProjects();

    if (this.id) {
      this.getDepartment();
    }

    this.form_dept = new FormGroup({
      name: new FormControl(this.department.name, [Validators.required]),
      language: new FormControl(this.department.language, [Validators.required]),
      project_id: new FormControl(this.project.id, [Validators.required]),
    });

  }

  private getProgrammers() {
    this.progerService.getProgers().subscribe((data: Programmer[]) => {
      this.all_programmers = data;

      this.populateDropdown(this.all_programmers);

      this.dropdownSettings = {
        idField: 'item_id',
        textField: 'item_text',
        allowSearchFilter: true
      };
    });
  }

  populateDropdown(programmers: Programmer[]) {
    this.dropdownList = [];
    for (const programmer of programmers) {
      this.dropdownList.push({item_id: programmer.id, item_text: programmer.first_name + " " + programmer.last_name});
    }
    // console.log(programmers[0])
    // this.selectedItems = [programmers[0]];
    // this.dropDownForm = this.fb.group({
    //   progs: [this.selectedItems]
    // });
  }

  private getProjects() {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    })
  }

  // private getLead() {
  //   this.leadService.getLead().subscribe((data) -> {
  //     this.programmers = data;
  //   })
  // }

  onSubmit() {
    if (this.form_dept.invalid) {
      console.log('INVALID');
      return;
    }

    Object.assign(this.department, this.form_dept.value);
    this.department.programmer_ids = this.programmer_ids;

    console.log(this.department);
    //
    if (this.id) {
      this.updateDepartment();
    } else {
      this.storeDepartment();
    }

  }

  private getDepartment() {
    console.log(this.id);
    if (this.id) {
      this.deptService.getDepartment(this.id).subscribe((data: any) => {
        this.project = data.project[0];
        this.department = data.department;
        this.programmers = data.programmers;

        this.form_dept.patchValue({
            'name': this.department.name,
            'language': this.department.language,
            'project_id': this.project.id
          });


        this.selectedItems = [];

        for (const programmer of this.programmers) {
          this.selectedItems.push({item_id: programmer.id, item_text: programmer.first_name + " " + programmer.last_name})
          this.programmer_ids.push(programmer.id);
        }

        this.dropDownForm.patchValue({
          'progs': this.selectedItems});


      })
    }
  }

  private updateDepartment() {
    this.deptService.updateDepartment(this.department).subscribe((data) => {
      if (data) {
        this.router.navigate(['']);
      }
    });
  }

  private storeDepartment() {
    this.deptService.storeDepartment(this.department).subscribe((data) => {
      if (data) {
        this.router.navigate(['']);
      }
    });
  }

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
}
