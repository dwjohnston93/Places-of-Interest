import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AppUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppUserProvider {

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController
  ) {
    console.log('Hello AppUserProvider Provider');
  }

  loggedIn: boolean = false; 
  newUser: boolean = false; 
  userInfo: any;
  baseURL: string = "http://localhost:3000/api/appUsers"; 
  loginURL: string = "/login?include=user"
  logoutURL: string = "/logout"
  userFirstName: string;
  token: any = sessionStorage.getItem("token"); 

  showAlert(param) {   
    const alert = this.alertCtrl.create({
      title: param,
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  userLogin(user){ 
     this.http.post(this.baseURL + this.loginURL, user).subscribe( (data:any) => {
        this.loggedIn = true; 
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        this.userInfo = data; 
        console.log("userInfo", this.userInfo);
        console.log("data.userId", data.userId); 
     }, err => {
            this.showAlert("login failed");
            console.log("login failed")
      });
  }

  userRegister(user){
    this.http.post(this.baseURL, user).subscribe( (data:any) => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('token', data.token);
      this.userFirstName = data.firstName; 
      this.newUser = true; 
      console.log("data", data); 
      console.log("data.firstName", data.firstName);
      console.log("data.id", data.id);
     }, err => {
      this.showAlert("Register Failed")
    })

  };
 
  userLogout(user){
    this.loggedIn = false; 
    this.newUser = false; 
    sessionStorage.clear();  
    return this.http.post(this.baseURL + this.logoutURL + this.token, user)
  }

}
