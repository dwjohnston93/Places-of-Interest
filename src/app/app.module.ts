import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/sign-in/sign-in';
import { LogoutPage } from '../pages/logout/logout'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUserProvider } from '../providers/app-user/app-user';
import { ResultsProvider } from '../providers/results/results';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppUserProvider,
    HomePage,
    ResultsProvider,
    HttpModule
  ]
})
export class AppModule {}
