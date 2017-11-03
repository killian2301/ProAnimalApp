import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CloudProvider} from '../providers/cloud/cloud';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

//PAGES
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SettingsPage} from "../pages/settings/settings";

//PIPES
import {CapitalizePipe} from "../pipes/capitalize/capitalize";
import {NewForAdoptionPage} from "../pages/new-for-adoption/new-for-adoption";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import { PetDetailsPage } from '../pages/pet-details/pet-details';

//SERVICES
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import * as  Cloudinary from 'cloudinary-core';

const firebaseConfig = {
  apiKey: "AIzaSyCDVa6tjLnQ0NrR_i9HGZJ68n6dAvmccVc",
  authDomain: "proanimalapp.firebaseapp.com",
  databaseURL: "https://proanimalapp.firebaseio.com",
  projectId: "proanimalapp",
  storageBucket: "proanimalapp.appspot.com",
  messagingSenderId: "123565811630"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    NewForAdoptionPage,
    PetDetailsPage,
    CapitalizePipe

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode: 'ios'}),
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'killianjimenez', upload_preset: 'sqa8g67l'}),

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
    PetDetailsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CloudProvider,
    Camera,
    ImagePicker
  ]
})
export class AppModule {
}
