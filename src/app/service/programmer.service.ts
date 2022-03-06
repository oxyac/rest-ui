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

  assignEachToProject(programmer_ids: number[], dep_id: number) {
    for (const programmerId of programmer_ids) {
      this.http.put<ResponseHttp>(environment.apiUrl + 'api/programmers/' + programmerId, dep_id).pipe(
        map((data)=> {
          return data;
        }),
        catchError((error)=>{
          return throwError(error);
        })
      );
    }
  }
}
