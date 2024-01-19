import { Component, OnInit } from '@angular/core';
import { User } from '../Pages/model/userInter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.showProfiles();
  }

  //user profile on login
  showProfiles(){
    this.http.get<any>('http://localhost:3000/users')
    .subscribe(res=>{
      this.users = res;
    })
  }
}
