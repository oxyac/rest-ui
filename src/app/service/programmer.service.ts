import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Programmer} from "../models/programmer";
import {ResponseHttp} from "../models/responseHttp";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProgrammerService {

  constructor(private http : HttpClient) { }

  getProgers(): Observable<any>{
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/programmers').pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }

  assignEachToDepartment(data: object) {
      this.http.put<ResponseHttp>(environment.apiUrl + 'api/programmers/assign', data).pipe(
        map((data)=> {
          return data;
        }),
        catchError((error)=>{
          return throwError(error);
        })
      );
  }

  getAssignedProgers(id: number) {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/programmers/' + id + '/department').pipe(
      map((data)=> {
        return data;
      }),
      catchError((error)=>{
        return throwError(error);
      })
    );
  }
}
