import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // create a user using the JSON server as backend 
  createUser(body){
    return this.http.post<any>('',body)
  }

  //get the user from the JSON server

  //update the user with the JSON server

  //delete the user with the JSON server

}
