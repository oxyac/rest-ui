import { Injectable } from '@angular/core';
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/projects').pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }

  assignProject(data: Object) {
    return this.http.put(environment.apiUrl + 'api/projects/assign', data).pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }
}
