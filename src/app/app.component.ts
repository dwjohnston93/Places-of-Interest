import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AppUserProvider } from '../providers/app-user/app-user';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public _appUser: AppUserProvider,
    public alertCtrl: AlertController
  ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sign In', component: SignInPage},
      { title: 'Map', component: HomePage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component){
    this.nav.setRoot(page.component);
    } else {
      
      this.nav.setRoot(HomePage);
    } 
  }

  //confirmation alert to confirm user wants to sign out
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this._appUser.userLogout("user")
            console.log('Yes clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
