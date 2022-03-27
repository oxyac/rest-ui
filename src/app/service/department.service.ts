import { Injectable } from '@angular/core';
import {Department} from "../models/department";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  private departments: Department[]

  private selectedDepartmentSource = new BehaviorSubject<Department | null>(null);
  public selectedDepartmentChanges$ = this.selectedDepartmentSource.asObservable();

  changeSelectedDepartment(selectedDepartment: Department | null): void {
    this.selectedDepartmentSource.next(selectedDepartment);
  }

  getAllDepartments(): Observable<Department[]> {
    if (this.departments) {
      return of(this.departments);
    }
    return this.http.get<Department[]>(environment.apiUrl + 'api/departments/')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.departments = data),
        catchError(this.handleError)
      );
  }



  createDepartment(department: Department): Observable<Department> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const newDepartment = { ...department, id: null };
    return this.http.post<Department>(environment.apiUrl + 'api/departments/', newDepartment, { headers })
      .pipe(
        tap(data => console.log('createDepartment: ' + JSON.stringify(data))),
        tap(data => {
          this.departments.push(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteDepartment(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<Department>(environment.apiUrl + 'api/departments/' + id, { headers })
      .pipe(
        tap(data => console.log('deleteDepartment: ' + id)),
        tap(data => {
          const foundIndex = this.departments.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.departments.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  updateDepartment(department: Department): Observable<Department> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Department>(environment.apiUrl + 'api/departments/' + department.id, department, { headers })
      .pipe(
        tap(() => console.log('updateDepartment: ' + department.id)),
        tap(() => {
          const foundIndex = this.departments.findIndex(item => item.id === department.id);
          if (foundIndex > -1) {
            this.departments[foundIndex] = department;
          }
        }),
        map(() => department),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  newDepartment(): Department {
    return {
      id: 0,
      name: 'New',
      language: ''
    };
  }

}
