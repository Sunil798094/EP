import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {
  // Flag to track login status
  Login: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiService,
    private toastr: ToastrService
  ) {
    // Clear session storage when the component is initialized
    sessionStorage.clear();
  }

  userData: any;
  filteredData: any;
  loginForm!: FormGroup;

  ngOnInit() {
    // Initialize the login form with form controls and validation rules
    this.loginForm = new FormGroup({
      "youremailaddress": new FormControl('', [Validators.email, Validators.required]),
      "yourpassword": new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
      )
    });
  }

  // Function to handle the login process
  login() {
    // Make an HTTP request to fetch manager data
    this.http.get<any>('http://localhost:3000/managers').subscribe(
      res => {
        // Log the response data
        console.log('res', res);

        // Store the fetched user data
        this.userData = res;

        // Extract email and password from the login form
        const emailAdded = this.loginForm.value.youremailaddress;
        const emailPassword = this.loginForm.value.yourpassword;

        // Find the user data with the matching email
        this.filteredData = this.userData.find((each: any) => each.email === emailAdded);
        console.log('dataModify', this.filteredData);

        // Check if the password matches
        if (this.filteredData && this.filteredData.password === emailPassword) {
          console.log('passcheck');

          // Set the login status
          this.service.Login();

          // Reset the login form
          this.loginForm.reset();

          // Navigate to the home route
          this.router.navigate(['/home']);
        } else {
          // Show a toastr info message for invalid email or password
          this.toastr.info("Invalid Email or Password");
        }
      },
      error => {
        // Log and show a toastr info message for any error during the HTTP request
        console.log(error, 'err');
        this.toastr.info("Something went wrong!!");
      }
    );
  }
}
