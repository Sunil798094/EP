import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-update',
  templateUrl: './manager-update.component.html',
  styleUrls: ['./manager-update.component.css']
})
export class ManagerUpdateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: ApiService,
    private route: ActivatedRoute
  ) { }

  editData: any;
  public editManagerForm: FormGroup;

  ngOnInit(): void {
    // Initialize the form with form controls and validation rules
    this.editManagerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })

    // Fetch manager data by ID from the server and populate the form
    this.service.getManagerById(this.route.snapshot.params['id']).subscribe((res) => {
      this.editData = res;
      this.editManagerForm.setValue({
        id: this.editData.id,
        name: this.editData.name,
        email: this.editData.email,
        password: this.editData.password,
        department: this.editData.department,
      });
    });
  }

  // Function to update manager details
  UpdateManager() {
    // Make an HTTP request to update manager details
    this.service.updateManager(this.route.snapshot.params['id'], this.editManagerForm.value)
      .subscribe((res) => {
        // Log the response
        console.log(res);
        // Show a toastr success message
        this.toastr.success("Manager details updated successfully");
      });
  }
}
