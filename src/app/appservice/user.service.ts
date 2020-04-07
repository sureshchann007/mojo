import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../appmodel/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentUserNameSubject: BehaviorSubject<User>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserNameSubject  = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
  }

  
  saveUser(user:any): Observable<any> {    
    return this.http.post(`${environment.apiUrl}/registration`,user);
  }

  getallUser() {    
    return this.http.get(`${environment.apiUrl}/user/getallUsers`);
  }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    public get currentUserName(): User {      
      return this.currentUserNameSubject.value;
    }

  loginUser(user:any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/login`, user)
            .pipe(map(user => {
                //set local storage parts
                localStorage.setItem('currentUser', JSON.stringify(user.token));
                localStorage.setItem('User', JSON.stringify(user.user.firstName));                
                this.currentUserSubject.next(user);
                this.currentUserNameSubject.next(user.user.firstName);
                //set local storage parts
                return user;
            }));
  }

  //logout functionality
  logout() {  
    localStorage.removeItem('currentUser');
    localStorage.removeItem('User');
    this.currentUserSubject.next(null);
    this.currentUserNameSubject.next(null);
  }
  //logout functionality

  getposterUser() {    
    return this.http.get(`${environment.apiUrl}/dashboard/list`);
  }
  
  savePoster(saveObj:any) {
    return this.http.post(`${environment.apiUrl}/dashboard/save`,saveObj);
  }

  editPoster(posterId: number) {
    return this.http.get(`${environment.apiUrl}/dashboard/edit?posterId=`+posterId);
  }
  
  
  deletePoster(posterId: number) {
    return this.http.get(`${environment.apiUrl}/dashboard/delete?posterId=`+posterId);
  }

  updatebasicPoster(updateObj:any){
    return this.http.post(`${environment.apiUrl}/dashboard/update`,updateObj);
  }


  // ###############################

  getmasterUser() {    
    return this.http.get(`${environment.apiUrl}/Master/list`);
  }

  saveMaster(saveObj:any) {
    return this.http.post(`${environment.apiUrl}/Master/save`,saveObj);
  }

  editMaster(posterId: number) {
    return this.http.get(`${environment.apiUrl}/Master/edit?masterId=`+posterId);
  }  
  
  deleteMaster(posterId: number) {
    return this.http.get(`${environment.apiUrl}/Master/delete?masterId=`+posterId);
  }

  updateMaster(updateObj:any){
    return this.http.post(`${environment.apiUrl}/Master/update`,updateObj);
  }

  getproductCode() {    
    return this.http.get(`${environment.apiUrl}/Master/productCode`);
  }

  saveBilling(saveObj:any){
    return this.http.post(`${environment.apiUrl}/Billing/saveBilling`,saveObj);
  }

  getinvoiceList(){
    return this.http.get(`${environment.apiUrl}/Billing/holelist`);
  }

}
