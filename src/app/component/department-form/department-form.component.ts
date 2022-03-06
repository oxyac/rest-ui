import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../models/department";
import {DepartmentService} from "../../service/department.service";
import {Programmer} from "../../models/programmer";
import {ProgrammerService} from "../../service/programmer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {LeadService} from "../../service/lead.service";
import {Project} from "../../models/project";
import {IDropdownSettings} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.sass']
})
export class DepartmentFormComponent implements OnInit {

  form_dept: FormGroup;
  form_progers: FormGroup;
  programmers: Programmer[];
  projects: Project[];


  id: number;
  department: Department;

  dropdownList: any[];
  dropdownSettings:IDropdownSettings={};

  programmer_ids : number[];

  constructor(private deptService: DepartmentService,
              private progerService: ProgrammerService,
              private projectService: ProjectService,
              private leadService: LeadService,
              private router: Router,
              private activaRoute: ActivatedRoute)
  {
    this.department = {
      id: 0,
      language: "AAA",
      project_id: 1,
      lead_id: 1
    }
  }

  ngOnInit(): void {
    this.programmer_ids = [];
    this.getProgrammers();
    this.getProjects();
    this.testCORS();

    this.form_dept = new FormGroup({
      language: new FormControl(this.department.language, [Validators.required]),
      project_id: new FormControl(this.department.project_id, [Validators.required]),

    });

    this.form_progers = new FormGroup({
      programmer_ids: new FormControl(this.programmer_ids),
    })
  }

  get f(){
    return this.form_dept.controls;
  }

  private getProgrammers() {
    this.progerService.getProgers().subscribe((data: Programmer[]) => {
      this.programmers = data;

      this.dropdownList = [];
      for (const programmer of this.programmers) {
        this.dropdownList.push({item_id: programmer.id, item_text: programmer.first_name + " " + programmer.last_name});
      }

      this.dropdownSettings = {
        idField: 'item_id',
        textField: 'item_text',
      };
    });
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
    if(this.form_dept.invalid){
      console.log('INVALID');
      return;
    }

    Object.assign(this.department, this.form_dept.value);

    Object.assign(this.programmer_ids, this.form_progers.value);
    console.log(this.programmer_ids);
    console.log(this.department);

    if(this.id){
      this.updateDepartment();
    }
    else{
      this.storeDepartment();
      this.assignProgrammers();
    }

  }

  private updateDepartment() {
    this.deptService.updateDepartment(this.department).subscribe((data)=>{
      if(data){
        this.router.navigate(['']);
      }
    });
  }

  private storeDepartment() {
    this.deptService.storeDepartment(this.department).subscribe((data)=>{
      if(data){
        this.router.navigate(['']);
      }
    });
  }

  private assignProgrammers() {
    this.progerService.assignEachToProject(this.programmer_ids, this.department.id);
  }




  private testCORS() {
    this.deptService.testCors();
  }

  onItemSelect(item: any) {
    this.programmer_ids.push(item.item_id);
  }
  onItemDeSelect(item: any) {
    this.programmer_ids.splice(this.programmer_ids.indexOf(item.item_id), 1);
  }
  onSelectAll(items: any) {
    this.programmer_ids = [];
    items.map((item: any)=> {
      this.programmer_ids.push(item.item_id);
    });
    console.log(this.programmer_ids);
  }
  onUnSelectAll() {
    this.programmer_ids = [];
  }


}
