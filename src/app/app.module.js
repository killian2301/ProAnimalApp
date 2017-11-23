var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudProvider } from '../providers/cloud/cloud';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

//PAGES
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from "../pages/settings/settings";


//PIPES
import { CapitalizePipe } from "../pipes/capitalize/capitalize";
import { NewForAdoptionPage } from "../pages/new-for-adoption/new-for-adoption";
import { Camera } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import 'babel-polyfill';
import { RequestUserInfoPage } from '../pages/request-user-info/request-user-info';

var firebaseConfig = {
    apiKey: "AIzaSyCDVa6tjLnQ0NrR_i9HGZJ68n6dAvmccVc",
    authDomain: "proanimalapp.firebaseapp.com",
    databaseURL: "https://proanimalapp.firebaseio.com",
    projectId: "proanimalapp",
    storageBucket: "proanimalapp.appspot.com",
    messagingSenderId: "123565811630"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                TabsPage,
                SettingsPage,
                NewForAdoptionPage,
                RequestUserInfoPage,
                CapitalizePipe
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp, { mode: 'ios' }),
                FormsModule,
                HttpModule,
                AngularFireModule.initializeApp(firebaseConfig),
                AngularFireDatabaseModule,
                AngularFireAuthModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                AboutPage,
                ContactPage,
                HomePage,
                TabsPage,
                SettingsPage,
                NewForAdoptionPage,
                RequestUserInfoPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                CloudProvider,
                Camera,
                ImagePicker
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
