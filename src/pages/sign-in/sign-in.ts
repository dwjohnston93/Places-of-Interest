import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUserProvider } from '../../providers/app-user/app-user';
import { HomePage } from '../../pages/home/home';
import { AlertController } from 'ionic-angular';


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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public _appUser: AppUserProvider,
    public alertCtrl: AlertController
  ) {}

  user = {};  
  newUser = {firstName: "blank"};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage')
  }

  doLogin(){
    this._appUser.userLogin(this.user);
    this.navCtrl.setRoot(HomePage);
  }

  doRegister(){
    console.log(this.newUser.firstName, "tnufN");
    if(this.newUser.firstName){
    this._appUser.userRegister(this.newUser, this.newUser.firstName);
    this.navCtrl.setRoot(HomePage);
    } 
  }
} 
