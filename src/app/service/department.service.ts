import { Injectable } from '@angular/core';
import {Department} from "../models/department";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JsonPipe} from "@angular/common";
import {parseJson} from "@angular/cli/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  storeDepartment(department: Department): Observable<any> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/departments/', department).pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/departments/' + department.id, department).pipe(
      map((data)=> {
        return data.data.item;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }

  getDepartment(id: number) {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/departments/' + id).pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }
}
