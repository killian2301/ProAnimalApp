import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CloudProvider } from "../providers/cloud/cloud";

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

//PIPES
import { CapitalizePipe } from "../pipes/capitalize/capitalize";
import { SanitizerPipe } from "../pipes/sanitizer/sanitizer";

//SERVICES
import { Camera } from "@ionic-native/camera";
import { FileTransfer } from "@ionic-native/file-transfer";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { Facebook } from "@ionic-native/facebook";
import cloudinary from "cloudinary-core";

//PAGES
import { NewForAdoptionPage } from "../pages/new-for-adoption/new-for-adoption";
import { PetDetailsPage } from "../pages/pet-details/pet-details";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { MyPetsPage } from "../pages/my-pets/my-pets";
import { MissingPetPage } from "../pages/missing-pet/missing-pet";
import { MyAdoptionsPage } from "../pages/my-adoptions/my-adoptions";
import { NewUserPage } from "../pages/new-user/new-user";
import { FCM } from "@ionic-native/fcm";
import { CookieService } from "angular2-cookie/core";
import { RequestUserInfoPage } from "../pages/request-user-info/request-user-info";
import { InterestedUserInfoPage } from "../pages/interested-user-info/interested-user-info";
import { ShortNamePipe } from "../pipes/short-name/short-name";

const cl = new cloudinary.Cloudinary({ cloud_name: "killianjimenez", upload_preset: "sqa8g67l" });

const firebaseConfig = {
  apiKey: "AIzaSyCDVa6tjLnQ0NrR_i9HGZJ68n6dAvmccVc",
  authDomain: "proanimalapp.firebaseapp.com",
  databaseURL: "https://proanimalapp.firebaseio.com",
  projectId: "proanimalapp",
  storageBucket: "proanimalapp.appspot.com",
  messagingSenderId: "123565811630"
};
export function cookieServiceFactory() {
  return new CookieService();
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    NewForAdoptionPage,
    PetDetailsPage,
    LoginPage,
    MyPetsPage,
    MyAdoptionsPage,
    MissingPetPage,
    NewUserPage,
    InterestedUserInfoPage,
    RequestUserInfoPage,
    CapitalizePipe,
    SanitizerPipe,
    ShortNamePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: "ios" }),
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    NewForAdoptionPage,
    PetDetailsPage,
    LoginPage,
    MyPetsPage,
    MissingPetPage,
    MyAdoptionsPage,
    NewUserPage,
    RequestUserInfoPage,
    InterestedUserInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CloudProvider,
    Camera,
    FileTransfer,
    SpinnerDialog,
    Facebook,
    FCM,
    FileTransfer,
    { provide: CookieService, useFactory: cookieServiceFactory }
  ]
})
export class AppModule {}
