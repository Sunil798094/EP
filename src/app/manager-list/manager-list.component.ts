import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {
  constructor(private service: ApiService, private toastr: ToastrService) {}

  // Array to hold manager data
  managerList: any;

  // MatTableDataSource to bind data to the table
  dataSource: any;

  // Columns to be displayed in the table
  displayedColumns: string[] = ['name', 'id', 'email', 'department', 'delete', 'update'];

  // Fetch the manager data from the server
  displayManager() {
    this.service.getManager().subscribe(
      (res) => {
        // Assign the fetched data to managerList
        this.managerList = res;

        // Set MatTableDataSource to update the table with new data
        this.dataSource = new MatTableDataSource(this.managerList);

        // Display success message using ToastrService
        this.toastr.success('Data is successfully fetched from the server');
      },
      (err) => {
        // Display error message if fetching data fails
        this.toastr.error('Error fetching data from the server');
      }
    );
  }

  ngOnInit(): void {
    // Call displayManager method when the component initializes
    this.displayManager();
  }

  // Apply filter to the table based on user input
  applyFilter(event: any): void {
    const filterValue = (event.target && event.target.value) ? event.target.value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Delete a manager record
  delete(item: any) {
    this.service.deleteManager(item).subscribe(
      (res) => {
        // Log the response
        console.log(res);

        // Remove the deleted item from the local dataSource array
        this.dataSource.data.splice(item - 1, 1);

        // Display success message using ToastrService
        this.toastr.success('Data is successfully deleted');
      },
      (err) => {
        // Display error message if deletion fails
        this.toastr.error('Error deleting data to the server');
      }
    );
  }
}
