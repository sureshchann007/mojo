import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/appservice/user.service';
import { Router } from '@angular/router';
import { MasterBean } from '../master-bean/masteBean';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
    selector:'app-master-list',
    templateUrl:'./masterList.component.html',
    styleUrls:['./masterList.component.css']
})
export class MasterListComponent implements OnInit , AfterViewInit{

    dataSource : MatTableDataSource<MasterBean>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    displayedColumns: string[] = ['masterId', 'productCode', 'productName', 'productCount','productPrice','Action'];


    constructor(private userService:UserService,private router:Router){
        this.dataSource = new MatTableDataSource<MasterBean>();
    }

    applyFilter(filterValue:String){
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }


    ngAfterViewInit() {
    }

    ngOnInit() {
        this.getallMasterList();
    }

    getallMasterList(){
        this.userService.getmasterUser().subscribe(data=> {
            console.log(data)
        });

    }

      addMaster(){
        this.router.navigate(['/Master-Add']);
      }

      deleteMaster(posterId){
        this.userService.deleteMaster(posterId).subscribe(data => {
          this.ngOnInit();
        })
      }

      editMaster(posterId){
        this.router.navigate(['/Master-Edit', posterId]);
      }

}
