import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  basePath = '/api/v1/users';
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


  //Create User
  create(item: any): Observable<User>{
    return this.http.post<User>(
      this.basePath,
      JSON.stringify(item),
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //Get User by id
  getById(id: any): Observable<User>{
    return this.http.get<User>(
      `${this.basePath}/${id}`,
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // getByGender(gender: string): Observable<User>{
  //
  // }


  //Get All Users
  getAll(): Observable<User>{
    return this.http.get<User>(this.basePath,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }



  //Delete User
  delete(id: any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(id:any, item: any): Observable<User>{
    return this.http.put<User>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
  updateLikes(id:any, item: any): Observable<User>{
    return this.http.patch<User>(`${this.basePath}/${id}`,JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

}
