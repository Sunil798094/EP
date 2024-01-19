import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  managerForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: ApiService) {}

  ngOnInit() {
    // Initialize the managerForm with form controls and validation rules
    this.managerForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      email: this.fb.control('', [Validators.required]),
      department: this.fb.control('', [Validators.required])
    });
  }

  // Function to load manager data by sending a POST request to the server
  loadManager() {
    if (this.managerForm.valid) {
      // If the form is valid, send a POST request to the server
      this.service.postManager(this.managerForm.value).subscribe(
        (res) => {
          // On success, show a success toastr message and reset the form
          this.toastr.success("Manager has been successfully registered");
          this.managerForm.reset();
        },
        (err) => {
          // On error, show an error toastr message
          this.toastr.error("Error posting data to the server");
        }
      );
    }
  }

  // Function to handle form submission when the form is invalid
  onEmptySubmit() {
    if (this.managerForm.invalid) {
      // If the form is invalid, show an error toastr message
      this.toastr.error('Please enter the required fields!!');
    }
  }
}
