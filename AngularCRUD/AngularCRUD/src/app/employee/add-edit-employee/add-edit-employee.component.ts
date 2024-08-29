import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  @Input() emp: any;
  EmployeeId = "";
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "";
  PhotoFilePath = "";
  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.PhotoFileName;
    })
  }

  // Add this method to handle the cancel action
  cancel() {
    // Implement cancel logic here
    // For example, you might want to reset the form or emit an event to the parent component
    console.log('Cancel clicked');
    // If you want to reset the form, you can do something like this:
    // this.resetForm();
  }

  // Optional: Add a method to reset the form
  resetForm() {
    this.EmployeeId = "";
    this.EmployeeName = "";
    this.Department = "";
    this.DateOfJoining = "";
    this.PhotoFileName = "";
    this.PhotoFilePath = "";
  }
}