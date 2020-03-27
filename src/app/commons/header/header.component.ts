import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from 'src/app/appservice/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header-common',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit{
    
    constructor(private userService:UserService,private route: ActivatedRoute, private router: Router){

    }

    ngAfterViewInit() {
    }

    ngOnInit() {
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }

}