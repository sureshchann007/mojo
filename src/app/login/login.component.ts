import { Component, OnInit } from '@angular/core';
import { UserService } from '../appservice/user.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declaration Parts
  public user:any={};
  returnUrl: string;
  error = ''
  // Declaration Parts

  constructor(private userService:UserService,private route: ActivatedRoute,private router:Router,public dialogRef:MatDialog,public snackBar: MatSnackBar){
    if (this.userService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

loginUser(user:any){
  this.userService.loginUser(user).subscribe(
      data => {
        console.log(data.user)
        if(data){
          if(data.user.role === 'ADMIN'){
            this.router.navigate(['/Dashboard']);
            this.dialogRef.closeAll();
            this.snackBar.open("Admin Login Successfully", "close", {
                duration: 2000,
              });
          }else{
            this.router.navigate(['/user']);
            this.dialogRef.closeAll();
            this.snackBar.open("User Login Successfully", "close", {
                duration: 2000,
              });
          }
          
        }
          
      },
      error => {
          this.error = error;    
          this.snackBar.open("Username & Password is incorrect", "close", {
            duration: 2000,
          });     
      });
}

}
