import { Component, OnInit } from '@angular/core';
import { UserService } from '../appservice/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector:'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})
export class SignupComponent implements OnInit{

    public user: any={};

    constructor(private userService:UserService,public dialogRef:MatDialog,public snackBar: MatSnackBar){

    }

    ngOnInit(){

    }

    saveUser(user:any,userForm:any){
        user.enabled=true;
        this.userService.saveUser(user).subscribe((respose)=>{
            if(respose){
                console.log(respose);
                this.dialogRef.closeAll();
                this.snackBar.open("User Saved Successfully", "close", {
                duration: 2000,
                });
                userForm.reset();
            }
        })
    }

}