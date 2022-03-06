import { Injectable } from '@angular/core';
import {Department} from "../models/department";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

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

  testCors() {

    // this.http.get(environment.apiUrl, { 'headers': headers });
  }
}
