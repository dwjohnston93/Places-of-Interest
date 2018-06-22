import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the AppUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppUserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AppUserProvider Provider');
  }

  baseUrl: string = "http://localhost:3000/api/appUsers"; 
  loginUrl: string = "/login?"

  userLogin(user){ 
    this.http.post(this.baseUrl + this.loginUrl, user).subscribe((data:any) => {
    }, err => {console.log("login failed")})
  }

  userRegister(user){
    this.http.post(this.baseUrl, user).subscribe((data:any) =>{
      console.log("userRegister with data:", data); 
    }, err => {console.log("register failed")})
  }

}
