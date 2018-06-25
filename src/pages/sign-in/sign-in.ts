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
  newUser = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage')
  }

  showAlert(param) {   
    const alert = this.alertCtrl.create({
      title: param,
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
}

  doLogin(){
    this._appUser.userLogin(this.user)
    .subscribe((data:any) => {
      console.log("doLogin on sign-in.ts")
      this.navCtrl.push(HomePage);
      }, err => {
        this.showAlert("login failed");
        console.log("login failed")
      });
    
    }

  doRegister(){
    console.log("doRegister with this.user:", this.newUser)
    this._appUser.userRegister(this.newUser)
      .subscribe((data:any) => {
        console.log("doRegister sign-in.ts");
        this.navCtrl.push(HomePage);
      }, err => {
        this.showAlert("register failed");
        console.log("register failed")
      });
  }
}
