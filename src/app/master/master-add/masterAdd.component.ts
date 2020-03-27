import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {FormControl,ReactiveFormsModule, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { UserService } from 'src/app/appservice/user.service';
import { Router } from '@angular/router';
import { MasterBean } from '../master-bean/masteBean';
import { MatSnackBar } from '@angular/material';

@Component({
    selector:'app-master-add',
    templateUrl:'./masterAdd.component.html',
    styleUrls:['./masterAdd.component.css']
})
export class MasterAddComponent implements OnInit , AfterViewInit{

    MasterForm: FormGroup;

    constructor(public mastermodel: FormBuilder,private userService:UserService,private router:Router,public snackBar: MatSnackBar){
    }

    ngAfterViewInit() {
    }

    ngOnInit() {     
        this.masterFormMethod()   
    }

    masterFormMethod() {
        this.MasterForm = this.mastermodel.group({
          productName: ['', [Validators.required]],
          productCount: ['', [Validators.required]],
          productPrice: ['', [Validators.required]],        
        })
      }

      saveMaster(){
        let saveValue = this.MasterForm.value;
        let filedata = new FormData();
        filedata.append('productName', saveValue.productName);
        filedata.append('productCount', saveValue.productCount);
        filedata.append('productPrice', saveValue.productPrice);
        console.log(saveValue)
        this.userService.saveMaster(saveValue).subscribe(data=> {
            if(data){
                this.snackBar.open("Saved Successfully", "close", {
                  duration: 2000,
                });
                this.router.navigate(['/Master-List']);
              }else{
                this.snackBar.open("Error in Save", "close", {
                  duration: 2000,
                });
              }
        });
      }

      cancel(){
        this.router.navigate(['/Master-List']);
      }


}