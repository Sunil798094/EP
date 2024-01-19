import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Flag indicating whether the user is logged in
  Login: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private service: ApiService) {
    // Clear session storage when the component is initialized
    sessionStorage.clear();
  }

  userData: any;
  filteredData: any;

  public loginForm: FormGroup
  ngOnInit() { 
  
  this.loginForm = new FormGroup({
    "youremailaddress": new FormControl('', [Validators.email, Validators.required]),
    "yourpassword": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    "role": new FormControl('', [ Validators.required])
  })}



  /**
   * Attempts to log in the user by sending a request to the server with provided credentials.
   */
  login() {
    // Send an HTTP GET request to the server to fetch user data
    this.http.get<any>('http://localhost:3000/employers')
      .subscribe(res => {

          console.log('res', res);
          this.userData = res;
          const emailAdded = this.loginForm.value.youremailaddress;
          const emailPassword = this.loginForm.value.yourpassword;
          const role = this.loginForm.value.role;
          this.filteredData = this.userData.find((each: any) => each.email === emailAdded);
          console.log('dataModify', this.filteredData);
          if (this.filteredData.password === emailPassword && this.filteredData.user_type === role) {
            sessionStorage.setItem("role",this.userData.user_type)
            console.log('passcheck');
            this.service.Login()
            this.loginForm.reset();
            this.router.navigate(['/']);
           
          } else {
            alert('Invalid Email or Password');
          }
        }, error => {
          console.log(error, 'err');

          alert("Something went wrong!!");
        })

      
  }
}
