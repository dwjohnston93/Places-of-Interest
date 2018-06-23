import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUserProvider } from '../../providers/app-user/app-user';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public _appUser: AppUserProvider) {
  }

  user = {};
  newUser = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  doLogin(){
    this._appUser.userLogin(this.user)
    .subscribe((data:any) => {
      console.log("doLogin on sign-in.ts")
      this.navCtrl.push(HomePage);
      }, err => {console.log("login failed")});
    
    }

  doRegister(){
    console.log("doRegister with this.user:", this.newUser)
    this._appUser.userRegister(this.newUser);
    this.navCtrl.push(HomePage);
  }
}
