import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../model/userInter';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userForm!: FormGroup
  users:User[]=[];

  isCreating:boolean=false;

  isEditMode:boolean=false;

  currentId:string = '';



  //construt the instance of the services and for the form.
  constructor(private fb: FormBuilder,private _apiService:ApiService, private toastr:ToastrService) {
  }

  dataSource:any;
  displayedColumns: string[] = ['userid','name', 'department', 'email', 'actions'];


  //create a reactive form.
  ngOnInit() {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      id: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      department: [null, [Validators.required,Validators.pattern]]
    })

    this.fetchUser();

  }
 
  //if empty form is submitted by the user then show the alert to the user.
  onEmptySubmit() {
    if (this.userForm.invalid) {
      alert('Please enter the required fields!!')
    }
  }


  //change the setting of the form to create user and listing
  jobForm(){
    this.isCreating = !this.isCreating;
    if(!this.isCreating){
      this.userForm.reset();
      
    }
  }

  //form submit and Post the user 
  onFormSubmit() {
    if(!this.isEditMode){

      this._apiService.postUser(this.userForm.value).subscribe((res)=>{
       this.toastr.success("User has been successfully registered")
       this.isCreating = false;
       this.fetchUser();
       this.userForm.reset();
      },(err)=>{this.toastr.error("Error to Update data to the server")})

    }
    else{
      
      this._apiService.updateUser(this.currentId, this.userForm.value).subscribe((res)=>{
        this.toastr.success("User has been successfully updated")

        this.isEditMode=false;
        this.isCreating=false;
        this.fetchUser();
        this.userForm.reset();
      },(err)=>{
        this.toastr.error("Error to Update data to the server")
      })
    }

  }

  //get the user from the db server
  onUserfetch(){
    this.fetchUser();
  }

  private fetchUser(){
    this._apiService.getUser().subscribe((res)=>{
      console.log(res);
      this.users=res;
      this.dataSource=new MatTableDataSource(this.users)
      this.toastr.success("User has been successfully fetched")
    },(err)=>{
      this.toastr.error("Error to fetch data from the server")
    })
  }

  //update the user in the form to updata the data of the user.
  editUser(id){

    this.currentId=id;

    this.isCreating=true;

    let currentuser = this.users.find((p)=>{return p.id === id})

    this.userForm.setValue({
      name: currentuser.name,
      id:currentuser.id,
      email:currentuser.email,
      password:currentuser.password,
      department: currentuser.department
    })

    this.isEditMode=true;
    

  }

  //delete the user from the server using the id of the user.
  deleteUser(id){

    const userResponse = window.confirm("Do you want delete this user??")
    if(userResponse){

      this._apiService.deleteUser(id).subscribe(()=>{
        this.fetchUser();
        this.toastr.success("User has been successfully deleted")
      },(err)=>{this.toastr.error("Error to delete data from the server")})
    }
    else{
      return
    }

  }

  //method to search the data by the search input from the user on the b=webpage
  applyFilter(event: any): void {
    const filterValue = (event.target && event.target.value) ? event.target.value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
