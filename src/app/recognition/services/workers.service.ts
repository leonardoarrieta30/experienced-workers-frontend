import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  // Workers Endpoint
  basePath = '/api/v1/workers';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //default error handling
      console.log(`An error occurred: ${error.error.message}`);
    }else{
      //Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    //Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }


  //Create Worker
  create(item: any): Observable<Worker>{
    return this.http.post<Worker>(
      this.basePath,
      JSON.stringify(item),
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Get Student by id
  getById(id: any): Observable<Worker>{
    return this.http.get<Worker>(
      `${this.basePath}/${id}`,
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // getByGender(gender: string): Observable<Worker>{
  //
  // }


  //Get All Workers
  getAll(): Observable<Worker>{
    return this.http.get<Worker>(this.basePath,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }



  //Delete Worker
  delete(id: any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(id:any, item: any): Observable<Worker>{
    return this.http.put<Worker>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
  updateLikes(id:any, item: any): Observable<Worker>{
    return this.http.patch<Worker>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }



}
