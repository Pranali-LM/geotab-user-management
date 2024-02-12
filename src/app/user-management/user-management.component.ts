import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeotabApiService } from '../geotab-api.service';
import { LmApiService } from '../lm-api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @Input()
  email = '';
  @Input()
  name = "";
  
  roles: any[] = [];
  selectedRoleControl = new FormControl();
  roleId : any 
  selectedTags = new FormControl();
  tags = ["South"]; 
  constructor(  private geotabAPI: GeotabApiService,
    private lmService: LmApiService,) { }

  ngOnInit(): void {
    this.geotabAPI.getSelectedUser().subscribe({
      next: (resp: any) => {
        console.log('Selected User Data:', resp);
        this.email = resp.result[0].name
        this.name = resp.result[0].firstName +" " + resp.result[0].lastName
      },
      error: (error: any) => {
        console.error('Error fetching selected user:', error);
      }
    });

    this.lmService.getAllRoles().subscribe({
      next: (resp: any) =>{
        console.warn(resp);
        resp.data.forEach((obj: any) => {
          this.roles.push(obj);

      });
     this.selectedRoleControl.setValue(this.roleId)
      },
      error : (error : any) =>{
        console.log(error); 
      }
    })
    this.geotabAPI.getData().subscribe({
      next:(resp:any) =>{
        console.log(resp)
        this.roleId = resp.result[0].details.roleId
      },
      error : (error:any) =>{
        console.log(error);
      }
    })
  }
  
  onSaveDetails(): void {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Role:', this.selectedRoleControl.value);
    console.log('Tags:', this.selectedTags.value);
    this.geotabAPI.addInData(this.selectedRoleControl.value , this.selectedTags.value).subscribe({
      next:(resp:any) => {
        console.log(resp);
      },
      error : (error : any) =>{
        console.log(error);
      }
    })
  }
  
}
