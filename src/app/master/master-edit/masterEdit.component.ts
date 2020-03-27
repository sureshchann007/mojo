import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {FormControl,ReactiveFormsModule, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { UserService } from 'src/app/appservice/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterBean } from '../master-bean/masteBean';
import { MatSnackBar } from '@angular/material';

@Component({
    selector:'app-master-edit',
    templateUrl:'./masterEdit.component.html',
    styleUrls:['./masterEdit.component.css']
})
export class MasterEditComponent implements OnInit , AfterViewInit{

    
    rowId :number;
    updateMasterForm: FormGroup;
    public updateObj: any={};    

    constructor(public updatemastermodel: FormBuilder,private route: ActivatedRoute,private userService:UserService,private router:Router,public snackBar: MatSnackBar){
    }

    ngAfterViewInit() {
    }

    ngOnInit() {     
        this.masterFormMethod()   
        this.rowId = this.route.snapshot.params['id'];
        this.edit(this.route.snapshot.params['id']);
    }

    masterFormMethod() {
        this.updateMasterForm = this.updatemastermodel.group({
          productCode:['',[Validators.required]],
          productName: ['', [Validators.required]],
          productCount: ['', [Validators.required]],
          productPrice: ['', [Validators.required]],        
        })
        this.updateMasterForm.get("productCode").disable();

        
      }

      edit(masterId){
        this.userService.editMaster(masterId).subscribe((data:any) => {
          let resposeData = data;   
    
          this.updateMasterForm.setValue({
            productCode: resposeData.productCode.toString(),
            productName: resposeData.productName.toString(),
            productCount: resposeData.productCount,
            productPrice : resposeData.productPrice,
          });
          
        })
      } 


      uploadMaster(){
        let rowId = this.rowId.toString();
        let updatePoster = this.updateMasterForm.value;
        
        this.updateObj = {
          "productCode":updatePoster.productCode,
          "productName":updatePoster.productName,
          "productCount":updatePoster.productCount,
          "productPrice":updatePoster.productPrice,
          "masterId":rowId 
        }

        this.userService.updateMaster(this.updateObj).subscribe(data=> {
            console.log(data);
            if(data){
              this.router.navigate(['/Master-List']);
            }        
          })

      }

      cancel(){
        this.router.navigate(['/Master-List']);
      }


}