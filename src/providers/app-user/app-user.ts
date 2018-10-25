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
  userInfo: any; 
  baseUrl: string = "http://localhost:3000/api/appUsers/"; 
  loginUrl: string = "login?include=user"

  showAlert(param) {   
    const alert = this.alertCtrl.create({
      title: param,
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  userLogin(user){ 
     this.http.post(this.baseUrl + this.loginUrl, user).subscribe( (data:any) => {
        this.loggedIn = true; 
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
    return this.http.post(this.baseUrl, user)
  }

  userLogout(user){
    
  }

}
